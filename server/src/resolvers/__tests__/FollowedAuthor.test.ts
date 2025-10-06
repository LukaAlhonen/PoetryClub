import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import {
  GetFollowedAuthorsQuery,
  GetFollowedAuthorQuery,
} from "../../__generated__/graphql.js";

import {
  GET_FOLLOWED_AUTHOR,
  GET_FOLLOWED_AUTHORS,
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
  const cache = new CacheAPI({ prefix: "FollowedAuthor" });
  const services = createServices({ prisma, cache });
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;

  let followedAuthors: NonNullable<GetFollowedAuthorsQuery["followedAuthors"]> =
    [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ services });
    await seed({ prisma });
    const response = await testServer.executeOperation<GetFollowedAuthorsQuery>(
      {
        query: GET_FOLLOWED_AUTHORS,
      },
    );

    if (response.body.kind === "single") {
      followedAuthors = response.body.singleResult.data?.followedAuthors;
    }
  });
  afterAll(async () => {
    await testServer.cleanup();
    await cache.delByPattern({ pattern: "*" });
  });

  test("follower", async () => {
    for (const followedAuthor of followedAuthors) {
      const response =
        await testServer.executeOperation<GetFollowedAuthorQuery>({
          query: GET_FOLLOWED_AUTHOR,
          variables: {
            id: followedAuthor.id,
          },
        });

      if (response.body.kind === "single") {
        const followedAuthor = response.body.singleResult.data?.followedAuthor;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(followedAuthor.follower).toBeDefined();
        expect(followedAuthor.follower.id).toBeDefined();
        // @ts-ignore
        expect(followedAuthor.follower.password).toBeUndefined();
      }
    }
  });

  test("following", async () => {
    for (const followedAuthor of followedAuthors) {
      const response =
        await testServer.executeOperation<GetFollowedAuthorQuery>({
          query: GET_FOLLOWED_AUTHOR,
          variables: {
            id: followedAuthor.id,
          },
        });

      if (response.body.kind === "single") {
        const followedAuthor = response.body.singleResult.data?.followedAuthor;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(followedAuthor.following).toBeDefined();
        expect(followedAuthor.following.id).toBeDefined();
        // @ts-ignore
        expect(followedAuthor.following.password).toBeUndefined();
      }
    }
  });
});
