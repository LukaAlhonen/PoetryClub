import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { LikeWithRelations } from "../types/extended-types.js";
import { validateInputStrings } from "../utils/validate-input-strings.js";

export class LikeService {
  private prisma: PrismaClient;
  private cache: CacheAPI;

  constructor({ prisma, cache }: { prisma: PrismaClient; cache: CacheAPI }) {
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * Returns a Like object matching the provided id
   * @param id - like id
   **/
  async getLike({ id }: { id: string }): Promise<LikeWithRelations | null> {
    const cacheKey = `like:id:${id}`;
    const cached = await this.cache.get<LikeWithRelations>({ key: cacheKey });
    if (cached) return cached;

    const like = await this.prisma.like.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    if (like) {
      await this.cache.set({ key: cacheKey, value: like });
      await this.cache.sAdd({ setKey: `like:${like.id}:queries`, cacheKey });
    }

    return like;
  }

  /**
   * Returns an array of Like objects, optionally filter by poem and or author
   * @param authorId - filter by author
   * @param poemId - filter by poem
   * @param first
   * @param after
   **/
  async getLikes({
    authorId,
    poemId,
    first,
    after,
  }: {
    authorId?: string;
    poemId?: string;
    first?: number;
    after?: string;
  } = {}): Promise<LikeWithRelations[] | null> {
    const cacheKey = `likes:first:${first ? first : "null"}:after:${after ? after : "null"}:poemId:${poemId ? poemId : "null"}:authorId:${authorId ? authorId : "null"}`;
    const cached = await this.cache.getAll<LikeWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;

    const queryFilter: Prisma.LikeWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const queryOptions: Prisma.LikeFindManyArgs = {
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

    const likes = (await this.prisma.like.findMany(
      queryOptions,
    )) as LikeWithRelations[];

    if (likes) {
      await this.cache.hSetArray({ key: cacheKey, valueArray: likes });
      for (const like of likes) {
        await this.cache.sAdd({ setKey: `like:${like.id}:queries`, cacheKey });
      }
    }

    return likes;
  }

  async hasPreviousPage({before, authorId, poemId}: {before: string, authorId?: string, poemId?: string}) {
    const firstLike = await this.prisma.like.findUnique({ where: { id: before } });
    if (!firstLike) return false;

    const queryFilter: Prisma.LikeWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const hasPrev = await this.prisma.like.findFirst({
      where: {
        ...queryFilter,
        OR: [
          {
            datePublished: { gt: firstLike.datePublished }
          },
          {
            datePublished: firstLike.datePublished,
            id: { gt: firstLike.id}
          }
        ]
      },
      orderBy: [{datePublished: "asc"}, {id: "asc"}],
      select: { id: true}
    })

    return Boolean(hasPrev)
  }

  async getLikesConnection({ first, after, authorId, poemId }: { first?: number, after?: string, authorId?: string, poemId?: string } = {}) {
    const likes = await this.getLikes({ first: first ? first + 1 : undefined, after, authorId, poemId });

    const hasNextPage = likes.length > (first ?? likes.length);
    const edges = hasNextPage ? likes.slice(0, first) : likes;

    const startCursor = edges.length > 0 ? edges[0].id : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].id : null;

    let hasPreviousPage = false;
    if (edges.length > 0) {
      hasPreviousPage = await this.hasPreviousPage({ before: edges[0].id, authorId, poemId });
    }

    return {
      edges: edges.map((like) => ({
        node: like,
        cursor: like.id
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
   * Creates Like
   * @param poemId - Poem
   * @param authorId - Author
   * @returns crated Like object
   **/
  async createLike({ poemId, authorId }: { poemId: string; authorId: string }) {
    validateInputStrings({ input: { poemId, authorId } });
    const like = await this.prisma.like.create({
      data: {
        poemId,
        authorId,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    if (like) {
      await this.cache.delByPattern({ pattern: "like:first:*" });
      await this.cache.removeRelations({ id: like.poemId, name: "poem" });
      await this.cache.removeRelations({ id: like.authorId, name: "author" });

      const cacheKey = `like:id:${like.id}`;
      await this.cache.set({ key: cacheKey, value: like });
    }

    return like;
  }

  /**
   * Removes Like
   * @param id - like to remove
   * @returns remvoed Like object
   **/
  async removeLike({ id }: { id: string }) {
    const like = await this.prisma.like.delete({
      where: {
        id,
      },
    });

    if (like) {
      await this.cache.removeRelations({ id: like.id, name: "like" });
      await this.cache.removeRelations({ id: like.authorId, name: "author" });
      await this.cache.removeRelations({ id: like.poemId, name: "poem" });
    }

    return like;
  }
}
