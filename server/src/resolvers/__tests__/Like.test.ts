import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import { GetLikesQuery, GetLikeQuery } from "../../__generated__/graphql.js";

import { GET_LIKE, GET_LIKES } from "../../__tests__/queries/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { createServices } from "../../services/index.js";

describe("Graphql Mutation integration tests", () => {
  const cache = new CacheAPI({ prefix: "Like" });
  const services = createServices({ prisma, cache });
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;

  let likes: NonNullable<GetLikesQuery["likes"]> = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ services });
    await seed({ prisma });
    const response = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
    });

    if (response.body.kind === "single") {
      likes = response.body.singleResult.data?.likes;
    }
  });
  afterAll(async () => {
    await testServer.cleanup();
    await cache.delByPattern({ pattern: "*" });
  });

  test("author", async () => {
    for (const like of likes) {
      const response = await testServer.executeOperation<GetLikeQuery>({
        query: GET_LIKE,
        variables: {
          id: like.id,
        },
      });

      if (response.body.kind === "single") {
        const like = response.body.singleResult.data?.like;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(like.author).toBeDefined();
        expect(like.author.id).toBeDefined();
        // @ts-ignore
        expect(like.author.password).toBeUndefined();
      }
    }
  });
  test("poem", async () => {
    for (const like of likes) {
      const response = await testServer.executeOperation<GetLikeQuery>({
        query: GET_LIKE,
        variables: {
          id: like.id,
        },
      });

      if (response.body.kind === "single") {
        const like = response.body.singleResult.data?.like;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(like.poem).toBeDefined();
        expect(like.poem.id).toBeDefined();
      }
    }
  });
});
