import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { CommentWithRelations } from "../types/extended-types.js";
import { validateInputStrings } from "../utils/validate-input-strings.js";

export class CommentService {
  private prisma: PrismaClient;
  private cache: CacheAPI;

  constructor({ prisma, cache }: { prisma: PrismaClient; cache: CacheAPI }) {
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * Returns a comment matching the provided id
   * @param id comment id
   **/
  async getComment({
    id,
  }: {
    id: string;
  }): Promise<CommentWithRelations | null> {
    const cacheKey = `comment:id:${id}`;
    const cached = await this.cache.get<CommentWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;

    const comment = await this.prisma.comment.findUniqueOrThrow({
      where: { id: id },
      include: { author: true, poem: true },
    });

    if (comment) {
      await this.cache.set({ key: cacheKey, value: comment });
      await this.cache.sAdd({
        setKey: `comment:${comment.id}:queries`,
        cacheKey,
      });
    }

    return comment;
  }

  /**
   * Returns array of Comment objects, optionally filter by author and or poem
   * @param authorId - filter by author
   * @param poemId - filter by poem
   * @param first
   * @param after
   *
   * @example
   * const comments = await poemAPI.getComments({poemId: poem.id})
   * console.log(comments.length) // 10
   **/
  async getComments({
    authorId,
    poemId,
    first,
    after,
  }: {
    authorId?: string;
    poemId?: string;
    first?: number;
    after?: string;
  } = {}): Promise<CommentWithRelations[] | null> {
    const cacheKey = `comments:first:${first ? first : "null"}:after:${after ? after : "null"}:authorId:${authorId ? authorId : "null"}:poemId:${poemId ? poemId : "null"}`;
    const cached = await this.cache.getAll<CommentWithRelations>({
      key: cacheKey,
    });
    if (cached) {
      return cached;
    }

    const queryFilter: Prisma.CommentWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const queryOptions: Prisma.CommentFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        poem: true,
      },
      orderBy: [{ datePublished: "desc" }, { id: "desc" }],
    };

    if (first) {
      queryOptions.take = first;
    }
    if (after) {
      queryOptions.cursor = {
        id: after,
      };
      queryOptions.skip = 1;
    }

    const comments = (await this.prisma.comment.findMany(
      queryOptions,
    )) as CommentWithRelations[];

    if (comments) {
      await this.cache.hSetArray({ key: cacheKey, valueArray: comments });
      // could optimise with pipeline
      for (const comment of comments) {
        await this.cache.sAdd({
          setKey: `comment:${comment.id}:queries`,
          cacheKey,
        });
        await this.cache.sAdd({
          setKey: `author:${comment.authorId}:queries`,
          cacheKey,
        });
        await this.cache.sAdd({
          setKey: `poem:${comment.poemId}:queries`,
          cacheKey,
        });
      }
    }

    return comments;
  }

  /**
   * Checks if the previous page exists for a given paginated query
   * @param before - ID of the first comment in the query
   * @param authorId - filter
   * @param poemId - filter
   * @returns - true if the previous page exists, false if not
  **/
  async hasPreviousPage ({before, authorId, poemId}: { before: string, authorId?: string, poemId?: string}): Promise<boolean> {
    const firstComment = await this.prisma.comment.findUnique({ where: { id: before } });
    if (!firstComment) return false;

    const queryFilter: Prisma.CommentWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const hasPrev = await this.prisma.comment.findFirst({
      where: {
        ...queryFilter,
        OR: [
          { datePublished: { gt: firstComment.datePublished } },
          {
            datePublished: firstComment.datePublished,
            id: { gt: firstComment.id }
          }
        ]
      },
      orderBy: [{ datePublished: "asc" }, { id: "asc" }],
      select: { id: true }
    });
    return Boolean(hasPrev)
  }

  /**
   * Get a page of collections using relay-style pagination
   * @param first
   * @param after
   * @param authorId - filter
   * @param poemId - filter
  **/
  async getCommentsConnection({ first, after, authorId, poemId }: { first?: number, after?: string, authorId?: string, poemId?: string } = {}) {
    // fetch one extra to check if there are more comments available
    const comments = await this.getComments({first: first ? first + 1 : undefined, after, authorId, poemId})

    const hasNextPage = comments.length > (first ?? comments.length);
    const edges = hasNextPage ? comments.slice(0, first) : comments;

    const startCursor = edges.length > 0 ? edges[0].id : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].id : null;

    let hasPreviousPage = false;
    if (edges.length > 0) {
      hasPreviousPage = await this.hasPreviousPage({ before: edges[0].id, authorId, poemId });
    }

    return {
      edges: edges.map((comment) => ({
        node: comment,
        cursor: comment.id
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
        pageSize: edges.length
      }
    }
  }

  /**
   * Create new comment with provided input
   * @param poemId - poem to associate comment with
   * @param authorId - comment author
   * @param text - comment text
   * @retursn created Comment object
   **/
  async createComment({
    poemId,
    authorId,
    text,
  }: {
    poemId: string;
    authorId: string;
    text: string;
  }) {
    validateInputStrings({ input: { poemId, authorId, text } });
    const comment = await this.prisma.comment.create({
      data: {
        poemId,
        authorId,
        text,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    if (comment) {
      await this.cache.delByPattern({ pattern: "comments:first:*" });
      await this.cache.removeRelations({
        id: comment.authorId,
        name: "author",
      });
      await this.cache.removeRelations({ id: comment.poemId, name: "poem" });

      const cacheKey = `comment:id:${comment.id}`;
      await this.cache.set({ key: cacheKey, value: comment });
    }

    return comment;
  }

  /**
   * Removes Comments
   * @param - comment to remove
   * @returns removed Commet object
   **/
  async removeComment({ id }: { id: string }) {
    const comment = await this.prisma.comment.delete({
      where: {
        id,
      },
    });

    if (comment) {
      await this.cache.removeRelations({ id: comment.id, name: "comment" });
      await this.cache.removeRelations({
        id: comment.authorId,
        name: "author",
      });
      await this.cache.removeRelations({ id: comment.poemId, name: "author" });
    }

    return comment;
  }
}
