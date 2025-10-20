import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { PoemWithRelations } from "../../types/extended-types.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";
import { comparePoemFields } from "../../utils/tests/compare-fields.js";
import { GetPoemsFilter } from "../../__generated__/types.js";

const sortPoems = ({
  poems,
}: {
  poems: PoemWithRelations[];
}): PoemWithRelations[] => {
  poems.sort((a, b) => {
    const dateDiff = b.datePublished.getTime() - a.datePublished.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });

  return poems;
};
describe("PoemService integration tests", () => {
  const cache = new CacheAPI();
  const services = createServices({ prisma, cache });
  const testId = randomUUID();
  let poems: PoemWithRelations[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
    poems = sortPoems({poems: seedResult.poems})
  });

  test("getPoem", async () => {
    for (const poem of poems) {
      const result = await services.poemService.getPoem({ id: poem.id })
      expect(result).toBeDefined();
      comparePoemFields(result, poem)
    }
  });

  test("getPoems", async () => {
    const result = await services.poemService.getPoems();

    expect(result).toBeDefined();
    expect(result).toHaveLength(8);

    for (let i = 0; i < 8; ++i) {
      comparePoemFields(result[i], poems[i])
    }
  })

  test("getPoems, with pagination", async () => {
    const result1 = await services.poemService.getPoems({first: 5})
    expect(result1).toBeDefined()
    expect(result1).toHaveLength(5);
    let i = 0;
    for (; i < 5; ++i) {
      comparePoemFields(result1[i], poems[i])
    }

    const result2 = await services.poemService.getPoems({first: 5, after: result1[i-1].id})
    expect(result2).toBeDefined();
    expect(result2).toHaveLength(3)
    for (let j = 0; j < 3 && i < 8; ++j && ++i) {
      comparePoemFields(result2[j], poems[i])
    }
  })

  test("getPoems, wiht filter", async () => {
    const result1 = await services.poemService.getPoems({
      filter: {
        authorId: poems[0].authorId
      }
    })
    expect(result1).toBeDefined();
    expect(result1).toHaveLength(2);
    for (const poem of result1) {
      expect(poem.authorId).toStrictEqual(poems[0].authorId)
    }

    const result2 = await services.poemService.getPoems({
      filter: {
        authorNameContains: "1"
      }
    })
    expect(result2).toBeDefined();
    expect(result2).toHaveLength(2);
    for (const poem of result2) {
      assert(poem.author.username.includes("1"))
    }

    const result3 = await services.poemService.getPoems({
      filter: {
        collectionId: poems[0].collectionId
      }
    })
    expect(result3).toBeDefined();
    expect(result3).toHaveLength(2);
    for(const poem of result3) {
      expect(poem.collectionId).toStrictEqual(poems[0].collectionId)
    }

    const result4 = await services.poemService.getPoems({
      filter: {
        titleContains: "author1"
      }
    })
    expect(result4).toBeDefined();
    expect(result4).toHaveLength(2);
    for (const poem of result4) {
      assert(poem.title.includes("author1"))
    }

    const result5 = await services.poemService.getPoems({
      filter: {
        textContains: "author1"
      }
    })
    expect(result5).toBeDefined();
    expect(result5).toHaveLength(2);
    for (const poem of result5) {
      assert(poem.text.includes("author1"))
    }
  })

  test("getPoemsConnection", async () => {
    const result = await services.poemService.getPoemsConnection();

    expect(result.edges).toHaveLength(8);

    result.edges.forEach((edge, i) => {
      comparePoemFields(edge.node, poems[i])
    })
  })

  test("getPoemsConnection, with pagination", async () => {
    const result1 = await services.poemService.getPoemsConnection({ first: 5 });

    expect(result1.edges).toHaveLength(5);
    expect(result1.pageInfo.hasNextPage).toBe(true);

    let i = 0;
    for (i; i < 5; ++i) {
      comparePoemFields(result1.edges[i].node, poems[i]);
    }

    const result2 = await services.poemService.getPoemsConnection({ first: 5, after: result1.pageInfo.endCursor });

    expect(result2.edges).toHaveLength(3);
    expect(result2.pageInfo.hasNextPage).toBe(false);

    for (let j = 0; j < 3; ++j && ++i) {
      comparePoemFields(result2.edges[j].node, poems[i])
    }
  })

  test("getPoemsConnection, with filter", async () => {
    const result1 = await services.poemService.getPoemsConnection({
      filter: {
        authorId: poems[0].authorId
      }
    })
    expect(result1.edges).toHaveLength(2);
    for (const edge of result1.edges) {
      expect(edge.node.authorId).toStrictEqual(poems[0].authorId)
    }

    const result2 = await services.poemService.getPoemsConnection({
      filter: {
        authorNameContains: "1"
      }
    })
    expect(result2.edges).toHaveLength(2);
    for (const edge of result2.edges) {
      assert(edge.node.author.username.includes("1"))
    }

    const result3 = await services.poemService.getPoemsConnection({
      filter: {
        collectionId: poems[0].collectionId
      }
    })
    expect(result3.edges).toHaveLength(2);
    for(const edge of result3.edges) {
      expect(edge.node.collectionId).toStrictEqual(poems[0].collectionId)
    }

    const result4 = await services.poemService.getPoemsConnection({
      filter: {
        titleContains: "author1"
      }
    })
    expect(result4.edges).toHaveLength(2);
    for (const edge of result4.edges) {
      assert(edge.node.title.includes("author1"))
    }

    const result5 = await services.poemService.getPoemsConnection({
      filter: {
        textContains: "author1"
      }
    })
    expect(result5.edges).toHaveLength(2);
    for (const edge of result5.edges) {
      assert(edge.node.text.includes("author1"))
    }
  })

  test("getLikesCount", async () => {
    const result = await services.poemService.getLikesCount({poemId: poems[0].id})
    expect(result).toBe(1)
  })
  test("getCommentsCount", async () => {
    const result = await services.poemService.getCommentsCount({poemId: poems[0].id})
    expect(result).toBe(2)
  })
  test("getSavedPoemsCount", async () => {
    const result = await services.poemService.getSavedPoemsCount({poemId: poems[0].id})
    expect(result).toBe(1)
  })

  test("createPoem", async () => {
    const result = await services.poemService.createPoem({
      authorId: poems[0].authorId,
      title: "testpoem",
      text: "testpoemtext"
    })

    const poem = await services.poemService.getPoem({id: result.id})
    expect(poem).toStrictEqual(result)
  })

  test("createPoem, with invalid input", async () => {
    await expect(services.poemService.createPoem({ authorId: testId, title: "author1 poem1", text: "" })).rejects.toThrow();
  })

  test("updatePoem", async () => {
    // batch query where updated poem should be included
    await services.poemService.getPoems({filter: {titleContains: "123"}})

    const result = await services.poemService.updatePoem({poemId: poems[0].id, title: "testPoem123", text: "testPoemText1234"})
    expect(result).toBeDefined();

    // make sure poem was updated
    const poem = await services.poemService.getPoem({id: result.id})
    expect(result).toStrictEqual(poem)

    // batch query where poem should be included
    const batchPoems = await services.poemService.getPoems({filter: {titleContains: "123"}})
    expect(batchPoems[0]).toStrictEqual(poem)
  })

  test("updatePoem, with invalid input", async () => {
    await expect(services.poemService.updatePoem({poemId: poems[0].id, title: "author1 poem1", text: "", collectionId: testId})).rejects.toThrow()
  })

  test("removePoem", async () => {
    const result = await services.poemService.removePoem({id: poems[0].id})
    expect(result).toBeDefined();

    // make sure poem was removed
    await expect(services.poemService.getPoem({id: result.id})).resolves.toBeNull()
    await expect(services.poemService.getPoems()).resolves.toHaveLength(7)
  })

  test("removePoem, with invalid id", async () => {
    await expect(services.poemService.removePoem({ id: testId })).rejects.toThrow();

    // make sure no poem was removed
    await expect(services.poemService.getPoems()).resolves.toHaveLength(8)
  })
});
