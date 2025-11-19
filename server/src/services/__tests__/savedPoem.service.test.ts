import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { SavedPoemWithRelations } from "../../types/extended-types.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";
import { compareSavedPoemFields } from "../../utils/tests/compare-fields.js";

const sortSavedPoems = ({
  savedPoems,
}: {
  savedPoems: SavedPoemWithRelations[];
}): SavedPoemWithRelations[] => {
  savedPoems.sort((a, b) => {
    const dateDiff = b.dateSaved.getTime() - a.dateSaved.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });

  return savedPoems;
};

describe("SavedPoemService integration tests", () => {
  const cache = new CacheAPI();
  const services = createServices({ prisma, cache });
  const testId = randomUUID();
  let savedPoems: SavedPoemWithRelations[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
    savedPoems = sortSavedPoems({savedPoems: seedResult.savedPoems})
  });

  test("getSavedPoem", async () => {
    for (const savedPoem of savedPoems) {
      const result = await services.savedPoemService.getSavedPoem({id: savedPoem.id})
      compareSavedPoemFields(result, savedPoem)
    }
  });

  test("getSavedPoem", async () => {
    await expect(services.savedPoemService.getSavedPoem({ id: "kksdfd" })).rejects.toThrow();
  })

  test("getSavedPoems", async () => {
    const result = await services.savedPoemService.getSavedPoems();
    expect(result).toBeDefined();
    expect(result).toHaveLength(8);

    for (let i = 0; i < 8; ++i) {
      compareSavedPoemFields(result[i], savedPoems[i])
    }
  })

  test("getSavedPoems, with pagination", async () => {
    const result1 = await services.savedPoemService.getSavedPoems({first: 5})
    expect(result1).toBeDefined();
    expect(result1).toHaveLength(5);
    let i = 0;
    for (; i < 5; ++i) {
      compareSavedPoemFields(result1[i], savedPoems[i])
    }

    const result2 = await services.savedPoemService.getSavedPoems({first: 5, after: result1[i-1].id})
    expect(result2).toBeDefined();
    expect(result2).toHaveLength(3);
    for (let j = 0; j < 3 && i < 8; ++j && ++i) {
      compareSavedPoemFields(result2[j], savedPoems[i])
    }
  })

  test("getSavedPoems, with filter", async () => {
    const result1 = await services.savedPoemService.getSavedPoems({
      authorId: savedPoems[0].authorId
    })
    expect(result1).toBeDefined();
    expect(result1).toHaveLength(2);
    for (const savedPoem of result1) {
      expect(savedPoem.authorId).toStrictEqual(savedPoems[0].authorId)
    }

    const result2 = await services.savedPoemService.getSavedPoems({
      poemId: savedPoems[0].poemId
    })
    expect(result2).toBeDefined();
    expect(result2).toHaveLength(1);
    expect(result2[0].poemId).toStrictEqual(savedPoems[0].poemId)
  })

  test("getSavedPoemsConnection", async () => {
    const result = await services.savedPoemService.getSavedPoemsConnection();

    expect(result.edges).toHaveLength(8);

    result.edges.forEach((edge, i) => {
      compareSavedPoemFields(edge.node, savedPoems[i])
    })
  })

  test("getSavedPoemsConnection, with pagination", async () => {
    const result1 = await services.savedPoemService.getSavedPoemsConnection({ first: 5 });

    expect(result1.edges).toHaveLength(5);
    expect(result1.pageInfo.hasNextPage).toBe(true);

    let i = 0;

    for (i; i < 5; ++i) {
      compareSavedPoemFields(result1.edges[i].node, savedPoems[i]);
    }

    const result2 = await services.savedPoemService.getSavedPoemsConnection({ first: 5, after: result1.pageInfo.endCursor });

    expect(result2.edges).toHaveLength(3);
    expect(result2.pageInfo.hasNextPage).toBe(false)

    for (let j = 0; j < 3; ++j && ++i) {
      compareSavedPoemFields(result2.edges[j].node, savedPoems[i])
    }
  })

  test("getSavedPoemsConnection, with filter", async () => {
    const result1 = await services.savedPoemService.getSavedPoemsConnection({
      authorId: savedPoems[0].authorId
    })
    expect(result1.edges).toHaveLength(2);
    for (const edge of result1.edges) {
      expect(edge.node.authorId).toStrictEqual(savedPoems[0].authorId)
    }

    const result2 = await services.savedPoemService.getSavedPoemsConnection({
      poemId: savedPoems[0].poemId
    })
    expect(result2.edges).toHaveLength(1);
    expect(result2.edges[0].node.poemId).toStrictEqual(savedPoems[0].poemId)
  })

  test("createSavedPoem", async () => {
    // create new author
    const author = await services.authorService.createAuthor({
      username: "pelle",
      email: "pelle@domain.com",
      password: "password"
    })

    const result = await services.savedPoemService.createSavedPoem({
      poemId: savedPoems[0].poemId,
      authorId: author.id
    })

    // make sure poem was created
    const poem = await services.savedPoemService.getSavedPoem({id: result.id})
    expect(poem).toStrictEqual(result)
    await expect(services.savedPoemService.getSavedPoems()).resolves.toHaveLength(9)
  })

  test("createSavedPoem, with invalid input", async () => {
    await expect(services.savedPoemService.createSavedPoem({ poemId: testId, authorId: "" })).rejects.toThrow();
  })

  test("removeSavedPoem", async () => {
    const result = await services.savedPoemService.removeSavedPoem({id: savedPoems[0].id})

    // make sure savedPoem was removed
    await expect(services.savedPoemService.getSavedPoem({ id: result.id })).rejects.toThrow();
    await expect(services.savedPoemService.getSavedPoems()).resolves.toHaveLength(7)
  })

  test("removeSavedPoem, with invalid id", async () => {
    await expect(services.savedPoemService.removeSavedPoem({ id: testId })).rejects.toThrow();

    // make sure no savedPoem was removed
    await expect(services.savedPoemService.getSavedPoems()).resolves.toHaveLength(8)
  })
});
