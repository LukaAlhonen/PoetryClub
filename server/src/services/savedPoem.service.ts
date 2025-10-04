import { PrismaClient, Prisma } from "../../generated/prisma/index.js";
import { CacheAPI } from "../cache/cache-api.js";
import { SavedPoemWithRelations } from "../types/extended-types.js";
import { validateInputStrings } from "../utils/validate-input-strings.js";

export class SavedPoemService {
  private prisma: PrismaClient;
  private cache: CacheAPI;

  constructor({ prisma, cache }: { prisma: PrismaClient; cache: CacheAPI }) {
    this.prisma = prisma;
    this.cache = cache;
  }

  /**
   * Returns a SavedPoem object matching the provided id
   * @param id - SavedPoem id
   **/
  async getSavedPoem({
    id,
  }: {
    id: string;
  }): Promise<SavedPoemWithRelations | null> {
    const cacheKey = `savedPoem:id:${id}`;
    const cached = await this.cache.get<SavedPoemWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;

    const savedPoem = await this.prisma.savedPoem.findUnique({
      where: { id },
      include: {
        author: true,
        poem: true,
      },
    });

    if (savedPoem) {
      await this.cache.set({ key: cacheKey, value: savedPoem });
      await this.cache.sAdd({
        setKey: `savedPoem:${savedPoem.id}:queries`,
        cacheKey,
      });
    }

    return savedPoem;
  }

  /**
   * Returns an array of SavedPoem objects, optianlly filter by poem and or author
   * @param authorId - author to filter by
   * @param poemId - poem to filter by
   * @limit
   * @cursor
   **/
  async getSavedPoems({
    authorId,
    poemId,
    limit,
    cursor,
  }: {
    authorId?: string;
    poemId?: string;
    limit?: number;
    cursor?: string;
  } = {}): Promise<SavedPoemWithRelations[] | null> {
    const cacheKey = `savedPoems:limit:${limit ? limit : "null"}:cursor:${cursor ? cursor : "null"}:poemId:${poemId ? poemId : "null"}:authorId:${authorId ? authorId : "null"}`;
    const cached = await this.cache.getAll<SavedPoemWithRelations>({
      key: cacheKey,
    });
    if (cached) return cached;

    const queryFilter: Prisma.SavedPoemWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const queryOptions: Prisma.SavedPoemFindManyArgs = {
      where: queryFilter,
      include: {
        author: true,
        poem: true,
      },
      orderBy: [{ dateSaved: "desc" }, { id: "desc" }],
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

    const savedPoems = (await this.prisma.savedPoem.findMany(
      queryOptions,
    )) as SavedPoemWithRelations[];

    if (savedPoems) {
      await this.cache.hSetArray({ key: cacheKey, valueArray: savedPoems });
      for (const savedPoem of savedPoems) {
        await this.cache.sAdd({
          setKey: `savedPoem:${savedPoem.id}:queries`,
          cacheKey,
        });
      }
    }

    return savedPoems;
  }

  /**
   * Creates a new SavedPoem object
   * @param poemId - Poem
   * @param authorId - Author
   * @returns created SavedPoem object
   **/
  async createSavedPoem({
    poemId,
    authorId,
  }: {
    poemId: string;
    authorId: string;
  }) {
    validateInputStrings({ input: { poemId, authorId } });
    const savedPoem = await this.prisma.savedPoem.create({
      data: {
        poemId,
        authorId,
      },
      include: {
        author: true,
        poem: true,
      },
    });

    if (savedPoem) {
      await this.cache.delByPattern({ pattern: "savedPoems:limit:*" });
      await this.cache.removeRelations({ id: savedPoem.poemId, name: "poem" });
      await this.cache.removeRelations({
        id: savedPoem.authorId,
        name: "author",
      });

      const cacheKey = `savedPoem:id:${savedPoem.id}`;
      await this.cache.set({ key: cacheKey, value: savedPoem });
    }

    return savedPoem;
  }

  /**
   * Removes SavedPoem
   * @param id - savedPoem to remove
   * @returns removed SavedPoem object
   **/
  async removeSavedPoem({ id }: { id: string }) {
    const savedPoem = await this.prisma.savedPoem.delete({
      where: {
        id,
      },
    });

    if (savedPoem) {
      await this.cache.removeRelations({ id: savedPoem.id, name: "savedPoem" });
      await this.cache.removeRelations({
        id: savedPoem.authorId,
        name: "savedPoem",
      });
      await this.cache.removeRelations({
        id: savedPoem.poemId,
        name: "savedPoem",
      });
    }

    return savedPoem;
  }
}
