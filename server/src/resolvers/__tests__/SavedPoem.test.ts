import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import { PoemAPI } from "../../datasources/poem-api.js";
import {
  GetSavedPoemsQuery,
  GetSavedPoemQuery,
} from "../../__generated__/graphql.js";

import {
  GET_SAVED_POEM,
  GET_SAVED_POEMS,
} from "../../__tests__/queries/index.js";

describe("Graphql SavedPoem integration tests", () => {
  // DB seeded with:
  // 4 authors
  // 8 poems (2 per author)
  // 4 collections (1 per author 2 poems per collection)
  // 16 comments (2 per poem and author)
  // 3 followed authors
  // 4 likes
  // 4 savedPoems
  const poemAPI = new PoemAPI(prisma);
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;

  let savedPoems: NonNullable<GetSavedPoemsQuery["savedPoems"]> = [];

  beforeEach(async () => {
    testServer = await createTestServer({ poemAPI });
    await seed({ prisma });
    const response = await testServer.executeOperation<GetSavedPoemsQuery>({
      query: GET_SAVED_POEMS,
    });

    if (response.body.kind === "single") {
      savedPoems = response.body.singleResult.data?.savedPoems;
    }
  });
  afterAll(async () => {
    await testServer.cleanup();
  });

  test("author", async () => {
    for (const savedPoem of savedPoems) {
      const response = await testServer.executeOperation<GetSavedPoemQuery>({
        query: GET_SAVED_POEM,
        variables: {
          id: savedPoem.id,
        },
      });

      if (response.body.kind === "single") {
        const savedPoem = response.body.singleResult.data?.savedPoem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(savedPoem.author).toBeDefined();
        expect(savedPoem.author.id).toBeDefined();
        // @ts-ignore
        expect(savedPoem.author.password).toBeUndefined();
      }
    }
  });

  test("poem", async () => {
    for (const savedPoem of savedPoems) {
      const response = await testServer.executeOperation<GetSavedPoemQuery>({
        query: GET_SAVED_POEM,
        variables: {
          id: savedPoem.id,
        },
      });

      if (response.body.kind === "single") {
        const savedPoem = response.body.singleResult.data?.savedPoem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(savedPoem.poem).toBeDefined();
        expect(savedPoem.poem.id).toBeDefined();
      }
    }
  });
});
