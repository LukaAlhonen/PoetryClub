import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { PoemWithRelations } from "../types/extended-types.js";
import { GetPoemsFilter, UpdatePoemInput } from "../__generated__/types.js";
import { validateInputStrings } from "../utils/validate-input-strings.js";

export class PoemService {
  private prisma: PrismaClient;
  private cache: CacheAPI;

  constructor({ prisma, cache }: { prisma: PrismaClient; cache: CacheAPI }) {
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * Returns an array of Poem objects,
   * optionally filter by authorId, authorNameContains, collectionId, textContains, titleContains
   *
   * @param cursor
   * @param limit
   * @param filter
   * @returns All poems that match filter
   *
   * @example
   * ```ts
   * const poems = await poemAPI.getPoems({limit: 10, filter: {authorNameContains: "edgar"}})
   * console.log(poems.length) // 10
   * ```
   **/
  async getPoems({
    cursor,
    limit,
    filter,
  }: {
    cursor?: string;
    limit?: number;
    filter?: GetPoemsFilter | null;
  } = {}): Promise<PoemWithRelations[] | null> {
    const cacheKey = `poems:limit:${limit ? limit : "null"}:cursor:${cursor ? cursor : "null"}:filter:${JSON.stringify(filter)}`;
    const cached = await this.cache.getAll<PoemWithRelations>({
      key: cacheKey,
    });
    if (cached) {
      return cached;
    }
    // Add fields from filter to queryfilter if they are present
    const queryFilter: Prisma.PoemWhereInput = filter
      ? {
          ...(filter.authorId ? { authorId: filter.authorId } : {}),
          ...(filter.collectionId ? { collectionId: filter.collectionId } : {}),
          ...(filter.textContains
            ? { text: { contains: filter.textContains, mode: "insensitive" } }
            : {}),
          ...(filter.titleContains
            ? { title: { contains: filter.titleContains, mode: "insensitive" } }
            : {}),
          ...(filter.authorNameContains
            ? {
                author: {
                  username: {
                    contains: filter.authorNameContains,
                    mode: "insensitive",
                  },
                },
              }
            : {}),
        }
      : {};

    const queryOptions: Prisma.PoemFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        likes: true,
        savedBy: true,
        comments: true,
        inCollection: true,
      },
      orderBy: [{ datePublished: "desc" }, { id: "desc" }],
    };

    if (limit) {
      queryOptions.take = limit;
    }

    if (cursor) {
      queryOptions.cursor = {
        id: cursor,
      };
      queryOptions.skip = 1;
    }

    const poems = (await this.prisma.poem.findMany(
      queryOptions,
    )) as PoemWithRelations[];

    if (poems) {
      await this.cache.hSetArray({ key: cacheKey, valueArray: poems });

      for (const poem of poems) {
        await this.cache.sAdd({ setKey: `poem:${poem.id}:queries`, cacheKey });
      }
    }

    return poems;
  }

  /**
   * Returns a Poem object matching the provied id
   * @param id - Poem id
   **/
  async getPoem({ id }: { id: string }): Promise<PoemWithRelations | null> {
    const cacheKey = `poem:id:${id}`;

    const cached = await this.cache.get<PoemWithRelations>({ key: cacheKey });

    if (cached) {
      return cached;
    }

    const poem = await this.prisma.poem.findUnique({
      where: { id: id },
      include: {
        author: true,
        inCollection: true,
        savedBy: true,
        likes: true,
        comments: true,
      },
    });

    if (poem) {
      await this.cache.set({ key: cacheKey, value: poem });
      await this.cache.sAdd({ setKey: `poem:${poem.id}:queries`, cacheKey });
    }

    return poem;
  }

  /**
   * Returns number of Like objects for a specific poem
   * @param poemId - poem to filter by
   **/
  async getLikesCount({ poemId }: { poemId: string }) {
    const cacheKey = `likesCount:poemId:${poemId}`;
    const cached = await this.cache.get<number>({ key: cacheKey });
    if (cached) {
      return cached;
    }

    const count = await this.prisma.like.count({
      where: {
        poemId,
      },
    });

    await this.cache.set({ key: cacheKey, value: count });
    await this.cache.sAdd({ setKey: `poem:${poemId}:queries`, cacheKey });

    return count;
  }

  /**
   * Returns the number of SavedPoem objects for a Poem matching the given id
   * @param poemId - poem to filter by
   **/
  async getSavedPoemsCount({ poemId }: { poemId: string }) {
    const cacheKey = `savedPoemsCount:poemId:${poemId}`;
    const cached = await this.cache.get<number>({ key: cacheKey });
    if (cached) return cached;

    const count = await this.prisma.savedPoem.count({
      where: {
        poemId,
      },
    });

    await this.cache.set({ key: cacheKey, value: count });
    await this.cache.sAdd({ setKey: `poem:${poemId}:queries`, cacheKey });

    return count;
  }

  /**
   * Returns the number of comments for a given poem
   * @param poemId - poem to get commentsCount for
   * @returns Number representing the amount of comments for a given poem
   *
   * @example
   * const commentsCount = await poemAPI.getCommentsCount({poemId: poem.id})
   * console.log(commentsCount) // 10
   **/
  async getCommentsCount({ poemId }: { poemId: string }) {
    const cacheKey = `commensCount:poemId:${poemId}`;
    const cached = await this.cache.get<number>({ key: cacheKey });
    if (cached) return cached;

    const count = await this.prisma.comment.count({
      where: {
        poemId,
      },
    });

    await this.cache.set({ key: cacheKey, value: count });
    await this.cache.sAdd({ setKey: `poem:${poemId}:queries`, cacheKey });

    return count;
  }

  /**
   * Create a new poem with the given input
   * @param authorId - poem author
   * @param text - poem text
   * @param title - pome title
   * @param collection - include poem in collection
   * @returns created Poem object
   **/
  async createPoem({
    authorId,
    text,
    title,
    collectionId = undefined,
  }: {
    authorId: string;
    text: string;
    title: string;
    collectionId?: string;
  }) {
    validateInputStrings({ input: { authorId, text, title, collectionId } });
    const poem = await this.prisma.poem.create({
      data: {
        title,
        text,
        author: {
          connect: { id: authorId },
        },
        ...(collectionId
          ? { inCollection: { connect: { id: collectionId } } }
          : {}),
        views: 0,
      },
      include: {
        author: true,
        inCollection: true,
        likes: true,
        savedBy: true,
        comments: true,
      },
    });

    if (poem) {
      await this.cache.delByPattern({ pattern: "poem:limit:*" });
      await this.cache.removeRelations({ id: poem.author.id, name: "author" });
      if (poem.inCollection)
        await this.cache.removeRelations({
          id: poem.collectionId,
          name: "collection",
        });

      const cacheKey = `poem:id:${poem.id}`;
      await this.cache.set({ key: cacheKey, value: poem });
    }

    return poem;
  }

  /**
   * Update Poem with provided input
   * @param title - poem title
   * @param poemId - poem to update
   * @param text - poem text
   * @param collection - collection to include poem in
   * @param views - number of times poem has been viewed
   * @returns updated Poem object
   **/
  async updatePoem({
    title,
    poemId,
    text,
    collectionId,
    views,
  }: UpdatePoemInput) {
    const data = {
      ...(title ? { title } : {}),
      ...(text ? { text } : {}),
      ...(collectionId ? { collectionId } : {}),
      ...(views ? { views } : {}),
    };

    validateInputStrings({ input: data });

    const poem = await this.prisma.poem.update({
      where: {
        id: poemId,
      },
      data,
      include: {
        inCollection: true,
        likes: true,
        author: true,
        comments: true,
        savedBy: true,
      },
    });

    if (poem) {
      // clear cache
      await this.cache.delByPattern({ pattern: "poems:limit:*" });
      await this.cache.removeRelations({ id: poem.id, name: "poem" });
      await this.cache.removeRelations({ id: poem.authorId, name: "author" });
      if (poem.collectionId)
        await this.cache.removeRelations({
          id: poem.collectionId,
          name: "collection",
        });
      for (const comment of poem.comments) {
        await this.cache.removeRelations({ id: comment.id, name: "comment" });
      }
      for (const like of poem.likes) {
        await this.cache.removeRelations({ id: like.id, name: "like" });
      }
      for (const savedPoem of poem.savedBy) {
        await this.cache.removeRelations({
          id: savedPoem.id,
          name: "savedPoem",
        });
      }

      // cache updated poem
      const cacheKey = `poem:id:${poem.id}`;
      await this.cache.set({ key: cacheKey, value: poem });
    }

    return poem;
  }

  /**
   * Increment views for specified poem
   * @param poemId - poem to increment views for
   * @returns updated Poem object
   **/
  async incrementPoemViews({ poemId }: { poemId: string }) {
    const poem = await this.prisma.poem.update({
      where: {
        id: poemId,
      },
      data: {
        views: { increment: 1 },
      },
      include: {
        comments: true,
        inCollection: true,
        author: true,
        likes: true,
        savedBy: true,
      },
    });

    if (poem) {
      await this.cache.delByPattern({ pattern: "poems:limit:*" });
      await this.cache.removeRelations({ id: poem.id, name: "poem" });
      await this.cache.removeRelations({ id: poem.authorId, name: "author" });
      if (poem.collectionId)
        await this.cache.removeRelations({
          id: poem.collectionId,
          name: "collection",
        });
      for (const comment of poem.comments) {
        await this.cache.removeRelations({ id: comment.id, name: "comment" });
      }
      for (const like of poem.likes) {
        await this.cache.removeRelations({ id: like.id, name: "like" });
      }
      for (const savedPoem of poem.savedBy) {
        await this.cache.removeRelations({
          id: savedPoem.id,
          name: "savedPoem",
        });
      }
    }

    return poem;
  }

  /**
   * Remove Poem
   * @param id - poem to remove
   * @returns removed Poem object
   **/
  async removePoem({ id }: { id: string }) {
    const poem = await this.prisma.poem.delete({
      where: {
        id,
      },
      include: {
        comments: true,
        likes: true,
        savedBy: true,
      },
    });

    if (poem) {
      await this.cache.removeRelations({ id: poem.id, name: "poem" });
      await this.cache.removeRelations({
        id: poem.collectionId,
        name: "collection",
      });
      await this.cache.removeRelations({ id: poem.authorId, name: "author" });
      for (const comment of poem.comments) {
        await this.cache.removeRelations({ id: comment.id, name: "comment" });
      }
      for (const like of poem.likes) {
        await this.cache.removeRelations({ id: like.id, name: "like" });
      }
      for (const savedPoem of poem.savedBy) {
        await this.cache.removeRelations({
          id: savedPoem.id,
          name: "savedPoem",
        });
      }
    }

    return poem;
  }
}
