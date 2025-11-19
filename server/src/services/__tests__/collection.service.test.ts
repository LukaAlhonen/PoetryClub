import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";
import { compareCollectionFields } from "../../utils/tests/compare-fields.js";
import { CollectionWithRelations } from "../../types/extended-types.js";

const sortCollections = ({
  collections,
}: {
  collections: CollectionWithRelations[];
}): CollectionWithRelations[] => {
  collections.sort((a, b) => {
    const dateDiff = b.dateCreated.getTime() - a.dateCreated.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });

  return collections;
};

describe("CollectionService integration tests", () => {
  const cache = new CacheAPI({ prefix: "CollectionService" });
  const services = createServices({ prisma, cache });
  const testId = randomUUID();
  let collections: CollectionWithRelations[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
    collections = sortCollections({ collections: seedResult.collections });
  });

  test("getCollection", async () => {
    for (const collection of collections) {
      const result = await services.collectionService.getCollection({
        id: collection.id,
      });
      expect(result).toBeDefined();
      compareCollectionFields(result, collection);
    }
  });

  test("getColleciton, with invalid id", async () => {
    await expect(
      services.collectionService.getCollection({ id: testId }),
    ).rejects.toThrow();
  });

  test("getCollections", async () => {
    const result = await services.collectionService.getCollections();
    expect(result).toHaveLength(4);

    for (let i = 0; i < 4; ++i) {
      compareCollectionFields(result[i], collections[i]);
    }
  });

  test("getCollections, with pagination", async () => {
    const result1 = await services.collectionService.getCollections({
      first: 3,
    });
    expect(result1).toHaveLength(3);

    for (let i = 0; i < 3; ++i) {
      compareCollectionFields(result1[i], collections[i]);
    }

    const result2 = await services.collectionService.getCollections({
      first: 3,
      after: result1[result1.length - 1].id,
    });

    expect(result2).toHaveLength(1);
    compareCollectionFields(result2[0], collections[3]);
  });

  test("getCollections, with filter", async () => {
    // get by authorId
    const result1 = await services.collectionService.getCollections({
      filter: {
        authorId: collections[0].authorId,
      },
    });

    expect(result1).toBeDefined();
    expect(result1).toHaveLength(1);
    expect(result1[0].authorId).toStrictEqual(collections[0].authorId);

    // get by authornameContains
    const result2 = await services.collectionService.getCollections({
      filter: {
        authorNameContains: "1",
      },
    });

    expect(result2).toBeDefined();
    expect(result2).toHaveLength(1);
    expect(result2[0].author.username).toStrictEqual("author1");

    // get by titleContains
    const result3 = await services.collectionService.getCollections({
      filter: {
        titleContains: "author1",
      },
    });

    expect(result3).toBeDefined();
    expect(result3).toHaveLength(1);
    expect(result3[0].title).toStrictEqual("author1 collection");
  });

  test("getCollectionsConnection", async () => {
    const result = await services.collectionService.getCollectionsConnection();

    expect(result.edges).toHaveLength(4)

    result.edges.forEach((edge, i) => {
      compareCollectionFields(edge.node, collections[i])
    })
  })

  test("getCollectionsConnection, with pagination", async () => {
    const result1 = await services.collectionService.getCollectionsConnection({ first: 3 });

    expect(result1.edges).toHaveLength(3);
    expect(result1.pageInfo.hasNextPage).toBe(true);

    let i = 0;
    for (i; i < 3; ++i) {
      compareCollectionFields(result1.edges[i].node, collections[i]);
    }

    const result2 = await services.collectionService.getCollectionsConnection({ first: 3, after: result1.pageInfo.endCursor });

    expect(result2.edges).toHaveLength(1);
    expect(result2.pageInfo.hasNextPage).toBe(false);

    compareCollectionFields(result2.edges[0].node, collections[i]);
  })

  test("getCollectionsConnection, with filter", async () => {
    // get by authorId
    const result1 = await services.collectionService.getCollectionsConnection({
      filter: {
        authorId: collections[0].authorId,
      },
    });

    expect(result1.edges).toHaveLength(1);
    expect(result1.edges[0].node.authorId).toStrictEqual(collections[0].authorId);

    // get by authornameContains
    const result2 = await services.collectionService.getCollectionsConnection({
      filter: {
        authorNameContains: "1",
      },
    });

    expect(result2.edges).toHaveLength(1);
    expect(result2.edges[0].node.author.username).toStrictEqual("author1");

    // get by titleContains
    const result3 = await services.collectionService.getCollectionsConnection({
      filter: {
        titleContains: "author1",
      },
    });

    expect(result3.edges).toHaveLength(1);
    expect(result3.edges[0].node.title).toStrictEqual("author1 collection");
  })

  test("createColleciton", async () => {
    const title = "test title";
    const result = await services.collectionService.createCollection({
      title,
      authorId: collections[0].authorId,
    });

    expect(result).toBeDefined();

    const result2 = await services.collectionService.getCollection({
      id: result.id,
    });
    expect(result2).toStrictEqual(result);
  });

  test("createColleciton, with invalid input", async () => {
    await expect(
      services.collectionService.createCollection({
        title: "",
        authorId: testId,
      }),
    ).rejects.toThrow();
  });

  test("updateCollection", async () => {
    // batch query that would include updated collection
    await services.collectionService.getCollections({
      filter: {
        titleContains: "updated",
      },
    });
    const result = await services.collectionService.updateCollection({
      id: collections[0].id,
      title: "updated title",
    });

    // make sure collection was updated
    const collection = await services.collectionService.getCollection({
      id: result.id,
    });
    expect(collection).toStrictEqual(result);

    // make sure collection is included in batch query
    const result2 = await services.collectionService.getCollections({
      filter: {
        titleContains: "updated",
      },
    });
    expect(result2).toStrictEqual([result]);
  });

  test("updateCollection, with invalid input", async () => {
    await expect(
      services.collectionService.updateCollection({
        title: "",
        id: testId,
      }),
    ).rejects.toThrow();
  });

  test("removeCollection", async () => {
    await services.collectionService.removeCollection({
      id: collections[0].id,
    });

    // make sure collection was removed
    await expect(services.collectionService.getCollection({ id: collections[0].id })).rejects.toThrow();

    // make sure only 3 collections remain
    const result3 = await services.collectionService.getCollections();
    expect(result3).toHaveLength(3);
  });

  test("removeColleciton, with invalid id", async () => {
    await expect(
      services.collectionService.removeCollection({ id: testId }),
    ).rejects.toThrow();
  });
});
