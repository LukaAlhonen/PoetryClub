import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import {
  GetCollectionQuery,
  GetCollectionsQuery,
} from "../../__generated__/graphql.js";

import {
  GET_COLLECTION,
  GET_COLLECTIONS,
} from "../../__tests__/queries/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { createServices } from "../../services/index.js";

describe("Graphql Mutation integration tests", () => {
  // DB seeded with:
  // 4 authors
  // 8 poems (2 per author)
  // 4 collections (1 per author 2 poems per collection)
  // 16 comments (2 per poem and author)
  // 3 followed authors
  // 4 likes
  // 4 savedPoems
  const cache = new CacheAPI({ prefix: "Collection" });
  const services = createServices({ prisma, cache });
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;

  let collections: NonNullable<GetCollectionsQuery["collections"]> = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ services });
    await seed({ prisma });

    const response = await testServer.executeOperation<GetCollectionsQuery>({
      query: GET_COLLECTIONS,
    });

    if (response.body.kind === "single") {
      collections = response.body.singleResult.data?.collections;
    }
  });
  afterAll(async () => {
    await testServer.cleanup();
    await cache.delByPattern({ pattern: "*" });
  });

  test("author", async () => {
    for (const collection of collections) {
      const response = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: {
          id: collection.id,
        },
      });

      if (response.body.kind === "single") {
        const collection = response.body.singleResult.data?.collection;
        const errors = response.body.singleResult.errors;

        if (errors) console.log(errors);

        expect(collection.author).toBeDefined();
        expect(collection.author.id).toBeDefined();
        // @ts-ignore
        expect(collection.author.password).toBeUndefined();
      }
    }
  });
  test("poems, without pagination", async () => {
    for (const collection of collections) {
      const response = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: {
          id: collection.id,
        },
      });

      if (response.body.kind === "single") {
        const collection = response.body.singleResult.data?.collection;
        const errors = response.body.singleResult.errors;

        if (errors) console.log(errors);

        expect(collection.poems).toBeDefined();
        expect(collection.poems).toHaveLength(2);

        for (const poem of collection.poems) {
          expect(poem.id).toBeDefined();
        }
      }
    }
  });
  test("poems, with pagination", async () => {
    let cursor = "";
    for (const collection of collections) {
      const initialResponse =
        await testServer.executeOperation<GetCollectionQuery>({
          query: GET_COLLECTION,
          variables: {
            id: collection.id,
            poemsLimit: 1,
          },
        });

      if (initialResponse.body.kind === "single") {
        const collection = initialResponse.body.singleResult.data?.collection;
        const errors = initialResponse.body.singleResult.errors;

        if (errors) console.log(errors);

        expect(collection.poems).toBeDefined();
        expect(collection.poems).toHaveLength(1);

        for (const poem of collection.poems) {
          expect(poem.id).toBeDefined();
        }

        cursor = collection.poems[collection.poems.length - 1].id;
      }

      const secondResponse =
        await testServer.executeOperation<GetCollectionQuery>({
          query: GET_COLLECTION,
          variables: {
            id: collection.id,
            poemsLimit: 1,
            poemsCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const collection = secondResponse.body.singleResult.data?.collection;
        const errors = secondResponse.body.singleResult.errors;

        if (errors) console.log(errors);

        expect(collection.poems).toBeDefined();
        expect(collection.poems).toHaveLength(1);

        for (const poem of collection.poems) {
          expect(poem.id).toBeDefined();
        }
      }
    }
  });
});
