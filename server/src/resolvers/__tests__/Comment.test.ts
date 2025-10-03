import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import {
  GetCommentsQuery,
  GetCommentQuery,
} from "../../__generated__/graphql.js";

import { GET_COMMENT, GET_COMMENTS } from "../../__tests__/queries/index.js";
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
  const cache = new CacheAPI({ prefix: "Comment" });
  const services = createServices({ prisma, cache });
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;
  let comments: NonNullable<GetCommentsQuery["comments"]> = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ services });
    await seed({ prisma });
    const response = await testServer.executeOperation<GetCommentsQuery>({
      query: GET_COMMENTS,
    });

    if (response.body.kind === "single") {
      comments = response.body.singleResult.data?.comments;
    }
  });
  afterAll(async () => {
    await testServer.cleanup();
  });

  test("poem", async () => {
    for (const comment of comments) {
      const response = await testServer.executeOperation<GetCommentQuery>({
        query: GET_COMMENT,
        variables: {
          id: comment.id,
        },
      });

      if (response.body.kind === "single") {
        const comment = response.body.singleResult.data?.comment;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(comment.author).toBeDefined();
        expect(comment.author.id).toBeDefined();
        // @ts-ignore
        expect(comment.author.password).toBeUndefined();
      }
    }
  });

  test("author", async () => {
    for (const comment of comments) {
      const response = await testServer.executeOperation<GetCommentQuery>({
        query: GET_COMMENT,
        variables: {
          id: comment.id,
        },
      });

      if (response.body.kind === "single") {
        const comment = response.body.singleResult.data?.comment;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(comment.poem).toBeDefined();
        expect(comment.poem.id).toBeDefined();
      }
    }
  });
});
