import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import { PoemAPI } from "../../datasources/poem-api.js";
import {
  GetAuthorsQuery,
  GetAuthorByIdQuery,
} from "../../__generated__/graphql.js";

import {
  GET_AUTHORS,
  GET_AUTHOR_BY_ID,
} from "../../__tests__/queries/index.js";
import { CacheAPI } from "../../cache/cache-api.js";

describe("Graphql Author integration tests", () => {
  // DB seeded with:
  // 4 authors
  // 8 poems (2 per author)
  // 4 collections (1 per author 2 poems per collection)
  // 16 comments (2 per poem and author)
  // 3 followed authors
  // 4 likes
  // 4 savedPoems
  const cache = new CacheAPI({ prefix: "Author" });
  const poemAPI = new PoemAPI(prisma, cache);
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;

  let authors: NonNullable<GetAuthorsQuery["authors"]> = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ poemAPI });
    await seed({ prisma });
    const response = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });
    if (response.body.kind === "single") {
      authors = response.body.singleResult.data?.authors;
    }
  });
  afterAll(async () => {
    await testServer.cleanup();
  });

  test("poems, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;
        expect(author.poems).toBeDefined();
        expect(author.poems).toHaveLength(2);

        for (const poem of author.poems) {
          expect(poem.id).toBeDefined();
        }
      }
    }
  });

  test("poems, with pagination", async () => {
    let cursor = "";
    for (const author of authors) {
      const initialResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            poemsLimit: 1,
          },
        });

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.poems).toBeDefined();
        expect(author.poems).toHaveLength(1);

        for (const poem of author.poems) {
          expect(poem.id).toBeDefined();
        }

        cursor = author.poems[author.poems.length - 1].id;
      }

      const secondResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            poemsLimit: 1,
            poemsCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.poems).toBeDefined();
        expect(author.poems).toHaveLength(1);

        for (const poem of author.poems) {
          expect(poem.id).toBeDefined();
        }
      }
    }
  });

  test("savedPoems, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.savedPoems).toBeDefined();
        expect(author.savedPoems).toHaveLength(2);

        for (const savedPoem of author.savedPoems) {
          expect(savedPoem.id).toBeDefined();
        }
      }
    }
  });

  test("savedPoems, with pagination", async () => {
    let cursor = "";
    for (const author of authors) {
      const initialResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            savedPoemsLimit: 1,
          },
        });

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.savedPoems).toBeDefined();
        expect(author.savedPoems).toHaveLength(1);

        for (const savedPoem of author.savedPoems) {
          expect(savedPoem.id).toBeDefined();
        }

        cursor = author.savedPoems[author.savedPoems.length - 1].id;
      }

      const secondResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            savedPoemsLimit: 1,
            savedPoemsCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.savedPoems).toBeDefined();
        expect(author.savedPoems).toHaveLength(1);

        for (const savedPoem of author.savedPoems) {
          expect(savedPoem.id).toBeDefined();
        }
      }
    }
  });

  test("comments, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.comments).toBeDefined();
        expect(author.comments).toHaveLength(4);

        for (const comment of author.comments) {
          expect(comment.id).toBeDefined();
        }
      }
    }
  });

  test("comments, with pagination", async () => {
    let cursor = "";
    for (const author of authors) {
      const initialResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            commentsLimit: 3,
          },
        });

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.comments).toBeDefined();
        expect(author.comments).toHaveLength(3);

        for (const comment of author.comments) {
          expect(comment.id).toBeDefined();
        }

        cursor = author.comments[author.comments.length - 1].id;
      }

      const secondResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            commentsLimit: 3,
            commentsCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.comments).toBeDefined();
        expect(author.comments).toHaveLength(1);

        for (const comment of author.comments) {
          expect(comment.id).toBeDefined();
        }
      }
    }
  });

  test("collections, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.collections).toBeDefined();
        expect(author.collections).toHaveLength(1);

        for (const collection of author.collections) {
          expect(collection.id).toBeDefined();
        }
      }
    }
  });

  test("collections, with pagination", async () => {
    let cursor = "";
    for (const author of authors) {
      const initialResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            collectionsLimit: 1,
          },
        });

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.collections).toBeDefined();
        expect(author.collections).toHaveLength(1);

        for (const collection of author.collections) {
          expect(collection.id).toBeDefined();
        }

        cursor = author.collections[author.collections.length - 1].id;
      }

      const secondResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            collectionsLimit: 1,
            collectionsCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.collections).toBeDefined();
        expect(author.collections).toHaveLength(0);

        for (const collection of author.collections) {
          expect(collection.id).toBeDefined();
        }
      }
    }
  });

  test("likedPoems, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.likedPoems).toBeDefined();
        expect(author.likedPoems).toHaveLength(2);

        for (const like of author.likedPoems) {
          expect(like.id).toBeDefined();
        }
      }
    }
  });

  test("likedPomes, with pagination", async () => {
    let cursor = "";
    for (const author of authors) {
      const initialResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            likedPoemsLimit: 1,
          },
        });

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.likedPoems).toBeDefined();
        expect(author.likedPoems).toHaveLength(1);

        for (const like of author.likedPoems) {
          expect(like.id).toBeDefined();
        }

        cursor = author.likedPoems[author.likedPoems.length - 1].id;
      }

      const secondResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            likedPoemsLimit: 1,
            likedPoemsCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.likedPoems).toBeDefined();
        expect(author.likedPoems).toHaveLength(1);

        for (const like of author.likedPoems) {
          expect(like.id).toBeDefined();
        }
      }
    }
  });

  test("followedBy, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.followedBy).toBeDefined();
        expect(author.followedBy).toHaveLength(3);

        for (const follower of author.followedBy) {
          expect(follower.id).toBeDefined();
        }
      }
    }
  });

  test("followedBy, with pagination", async () => {
    let cursor = "";
    for (const author of authors) {
      const initialResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            followedByLimit: 2,
          },
        });

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.followedBy).toBeDefined();
        expect(author.followedBy).toHaveLength(2);

        for (const follower of author.followedBy) {
          expect(follower.id).toBeDefined();
        }

        cursor = author.followedBy[author.followedBy.length - 1].id;
      }

      const secondResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            followedByLimit: 2,
            followedByCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.followedBy).toBeDefined();
        expect(author.followedBy).toHaveLength(1);

        for (const follower of author.followedBy) {
          expect(follower.id).toBeDefined();
        }
      }
    }
  });

  test("followedByCount", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;
        expect(author.followedByCount).toBe(3);
      }
    }
  });

  test("following, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.following).toBeDefined();
        expect(author.following).toHaveLength(3);

        for (const following of author.following) {
          expect(following.id).toBeDefined();
        }
      }
    }
  });

  test("following, with pagination", async () => {
    let cursor = "";
    for (const author of authors) {
      const initialResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            followingLimit: 2,
          },
        });

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.following).toBeDefined();
        expect(author.following).toHaveLength(2);

        for (const following of author.following) {
          expect(following.id).toBeDefined();

          cursor = author.following[author.following.length - 1].id;
        }
      }

      const secondResponse =
        await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
            followingLimit: 2,
            followingCursor: cursor,
          },
        });

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.following).toBeDefined();
        expect(author.following).toHaveLength(1);

        for (const following of author.following) {
          expect(following.id).toBeDefined();
        }
      }
    }
  });

  test("followingCount", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.followingCount).toBe(3);
      }
    }
  });
});
