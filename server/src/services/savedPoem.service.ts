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
   * @first
   * @after
   **/
  async getSavedPoems({
    authorId,
    poemId,
    first,
    after,
  }: {
    authorId?: string;
    poemId?: string;
    first?: number;
    after?: string;
  } = {}): Promise<SavedPoemWithRelations[] | null> {
    const cacheKey = `savedPoems:first:${first ? first : "null"}:after:${after ? after : "null"}:poemId:${poemId ? poemId : "null"}:authorId:${authorId ? authorId : "null"}`;
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
    if (first) {
      queryOptions.take = first;
    }
    if (after) {
      queryOptions.cursor = {
        id: after,
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

  async hasPreviousPage ({before, authorId, poemId}: { before: string, authorId?: string, poemId?: string}): Promise<boolean> {
    const firstSavedPoem = await this.prisma.savedPoem.findUnique({ where: { id: before } });
    if (!firstSavedPoem) return false;

    const queryFilter: Prisma.SavedPoemWhereInput = {
      ...(authorId ? { authorId } : {}),
      ...(poemId ? { poemId } : {}),
    };

    const hasPrev = await this.prisma.savedPoem.findFirst({
      where: {
        ...queryFilter,
        OR: [
          { dateSaved: { gt: firstSavedPoem.dateSaved } },
          {
            dateSaved: firstSavedPoem.dateSaved,
            id: { gt: firstSavedPoem.id }
          }
        ]
      },
      orderBy: [{ dateSaved: "asc" }, { id: "asc" }],
      select: { id: true }
    });
    return Boolean(hasPrev)
  }

  async getSavedPoemsConnection({ after, first, authorId, poemId }: { after?: string, first?: number, authorId?: string, poemId?: string } = {}) {
    const savedPoems = await this.getSavedPoems({after, first: first ? first + 1 : undefined, poemId, authorId});

    const hasNextPage = savedPoems.length > (first ?? savedPoems.length);
    const edges = hasNextPage ? savedPoems.slice(0, first) : savedPoems;

    const startCursor = edges.length > 0 ? edges[0].id : null;
    const endCursor = edges.length > 0 ? edges[edges.length - 1].id : null;

    let hasPreviousPage = false;
    if (edges.length > 0) {
      hasPreviousPage = await this.hasPreviousPage({ before: edges[0].id, authorId, poemId });
    }

    return {
      edges: edges.map((savedPoem) => ({
        node: savedPoem,
        cursor: endCursor
      })),
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor,
        endCursor,
        pageSize: edges.length
      }
    };
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
      await this.cache.delByPattern({ pattern: "savedPoems:first:*" });
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
