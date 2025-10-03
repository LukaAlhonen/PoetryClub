import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { CollectionWithRelations } from "../types/extended-types.js";
import {
  GetCollectionsFilter,
  UpdateCollectionInput,
} from "../__generated__/types.js";
import { validateInputStrings } from "../utils/validate-input-strings.js";

export class CollectionService {
  private prisma: PrismaClient;
  private cache: CacheAPI;

  constructor({ prisma, cache }: { prisma: PrismaClient; cache: CacheAPI }) {
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * Returns a Collection object matching the provided id
   * @param id - collection id
   **/
  async getCollection({
    id,
  }: {
    id: string;
  }): Promise<CollectionWithRelations> {
    const cacheKey = `collection:id:${id}`;
    const cached = await this.cache.get<CollectionWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;
    const collection = await this.prisma.collection.findUnique({
      where: { id: id },
      include: { author: true, poems: true },
    });

    if (collection) {
      await this.cache.set({ key: cacheKey, value: collection });
      await this.cache.sAdd({
        setKey: `collection:${collection.id}:queries`,
        cacheKey,
      });
    }

    return collection;
  }

  /**
   * Returns an Array of Collection objects, optioanlly filter by author, authorNameContains, titleContains
   * @param limit
   * @param cursor
   * @param filter
   **/
  async getCollections({
    limit,
    cursor,
    filter,
  }: {
    limit?: number;
    cursor?: string;
    filter?: GetCollectionsFilter;
  } = {}): Promise<CollectionWithRelations[]> {
    const cacheKey = `collections:limit:${limit ? limit : "null"}:cursor:${cursor ? cursor : null}:filter:${filter ? JSON.stringify(filter) : "null"}`;
    const cached = await this.cache.getAll<CollectionWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;

    const queryFilter: Prisma.CollectionWhereInput = filter
      ? {
          ...(filter.authorId ? { authorId: filter.authorId } : {}),
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
          ...(filter.titleContains
            ? { title: { contains: filter.titleContains, mode: "insensitive" } }
            : {}),
        }
      : {};

    const queryOptions: Prisma.CollectionFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        poems: true,
      },
      orderBy: [{ dateCreated: "desc" }, { id: "desc" }],
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

    const collections = (await this.prisma.collection.findMany(
      queryOptions,
    )) as CollectionWithRelations[];

    if (collections) {
      await this.cache.hSetArray({ key: cacheKey, valueArray: collections });
      for (const collection of collections) {
        await this.cache.sAdd({
          setKey: `collection:${collection.id}:queries`,
          cacheKey,
        });
      }
    }

    return collections;
  }

  /**
   * Updates collection with provided input
   * @param id - collection to update
   * @param title - update collection title
   * @returns updated Colleciton object
   **/
  async updateCollection({ id, title }: UpdateCollectionInput) {
    validateInputStrings({ input: { title } });

    const collection = await this.prisma.collection.update({
      where: {
        id,
      },
      data: { title },
      include: {
        author: true,
        poems: true,
      },
    });

    if (collection) {
      await this.cache.delByPattern({ pattern: "collections:limit:*" });
      await this.cache.removeRelations({
        id: collection.id,
        name: "collection",
      });
      await this.cache.removeRelations({
        id: collection.authorId,
        name: "author",
      });
      for (const poem of collection.poems) {
        await this.cache.removeRelations({ id: poem.id, name: "poem" });
      }

      const cacheKey = `collection:id:${collection.id}`;
      await this.cache.set({ key: cacheKey, value: collection });
      await this.cache.sAdd({
        setKey: `collection:${collection.id}:queries`,
        cacheKey,
      });
    }

    return collection;
  }

  /**
   * Create Collection with provided input
   * @param authorId - collection author
   * @param title - collection title
   * @returns created Collection object
   **/
  async createCollection({
    authorId,
    title,
  }: {
    authorId: string;
    title: string;
  }) {
    validateInputStrings({ input: { authorId, title } });
    const collection = await this.prisma.collection.create({
      data: { authorId, title },
      include: { poems: true, author: true },
    });

    if (collection) {
      await this.cache.delByPattern({ pattern: "collections:limit:*" });
      await this.cache.removeRelations({
        id: collection.authorId,
        name: "author",
      });

      const cacheKey = `collection:id:${collection.id}`;
      await this.cache.set({ key: cacheKey, value: collection });
    }

    return collection;
  }

  /**
   * Removes Collection
   * @param id - collection to remove
   * @returns removed Collection object
   **/
  async removeCollection({ id }: { id: string }) {
    const collection = await this.prisma.collection.delete({
      where: {
        id,
      },
      include: {
        poems: true,
      },
    });

    if (collection) {
      await this.cache.removeRelations({
        id: collection.id,
        name: "collection",
      });
      await this.cache.removeRelations({
        id: collection.authorId,
        name: "author",
      });
      for (const poem of collection.poems) {
        await this.cache.removeRelations({ id: poem.id, name: "poem" });
      }
    }

    return collection;
  }
}
