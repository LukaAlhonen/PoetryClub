import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import {
  GetAuthorByIdQuery,
} from "../../__generated__/graphql.js";

import {
  GET_AUTHOR_BY_ID,
} from "../../__tests__/queries/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { createServices } from "../../services/index.js";
import { AuthorWithRelations } from "../../types/extended-types.js";

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
  const services = createServices({ prisma, cache });
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;

  let authors: AuthorWithRelations[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ services });
    const result = await seed({ prisma });
    authors = result.authors;
  });
  afterAll(async () => {
    await testServer.cleanup();
    await cache.delByPattern({ pattern: "*" });
  });

  test("poems, without pagination", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;
        expect(author.poems).toBeDefined();
        expect(author.poems.edges).toHaveLength(2);
        expect(author.poems.pageInfo.pageSize).toStrictEqual(author.poems.edges.length)

        for (const poemEdge of author.poems.edges) {
          expect(poemEdge.node.id).toBeDefined();
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

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.poems).toBeDefined();
        expect(author.poems.edges).toHaveLength(1);
        expect(author.poems.pageInfo.pageSize).toStrictEqual(author.poems.edges.length)
        expect(author.poems.pageInfo.hasNextPage).toBe(true);
        expect(author.poems.pageInfo.hasPreviousPage).toBe(false);

        for (const poemEdge of author.poems.edges) {
          expect(poemEdge.node.id).toBeDefined();
        }

        cursor = author.poems.pageInfo.endCursor;
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

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.poems).toBeDefined();
        expect(author.poems.edges).toHaveLength(1);
        expect(author.poems.pageInfo.pageSize).toStrictEqual(author.poems.edges.length)
        expect(author.poems.pageInfo.hasNextPage).toBe(false);
        expect(author.poems.pageInfo.hasPreviousPage).toBe(true);

        for (const poemEdge of author.poems.edges) {
          expect(poemEdge.node.id).toBeDefined();
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

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.savedPoems).toBeDefined();
        expect(author.savedPoems.edges).toHaveLength(2);
        expect(author.savedPoems.pageInfo.pageSize).toStrictEqual(author.savedPoems.edges.length)

        for (const savedPoemEdge of author.savedPoems.edges) {
          expect(savedPoemEdge.node.id).toBeDefined();
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

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.savedPoems).toBeDefined();
        expect(author.savedPoems.edges).toHaveLength(1);
        expect(author.savedPoems.pageInfo.pageSize).toStrictEqual(author.savedPoems.edges.length)
        expect(author.savedPoems.pageInfo.hasNextPage).toBe(true)
        expect(author.savedPoems.pageInfo.hasPreviousPage).toBe(false)

        for (const savedPoemEdge of author.savedPoems.edges) {
          expect(savedPoemEdge.node.id).toBeDefined();
        }

        cursor = author.savedPoems.pageInfo.endCursor;
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

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.savedPoems).toBeDefined();
        expect(author.savedPoems.edges).toHaveLength(1);
        expect(author.savedPoems.pageInfo.pageSize).toStrictEqual(author.savedPoems.edges.length)
        expect(author.savedPoems.pageInfo.hasNextPage).toBe(false)
        expect(author.savedPoems.pageInfo.hasPreviousPage).toBe(true)

        for (const savedPoemEdge of author.savedPoems.edges) {
          expect(savedPoemEdge.node.id).toBeDefined();
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

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.comments).toBeDefined();
        expect(author.comments.edges).toHaveLength(4);
        expect(author.comments.pageInfo.pageSize).toStrictEqual(author.comments.edges.length)

        for (const commentEdge of author.comments.edges) {
          expect(commentEdge.node.id).toBeDefined();
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

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.comments).toBeDefined();
        expect(author.comments.edges).toHaveLength(3);
        expect(author.comments.pageInfo.pageSize).toStrictEqual(author.comments.edges.length)
        expect(author.comments.pageInfo.hasNextPage).toBe(true);
        expect(author.comments.pageInfo.hasPreviousPage).toBe(false)

        for (const commentEdge of author.comments.edges) {
          expect(commentEdge.node.id).toBeDefined();
        }

        cursor = author.comments.pageInfo.endCursor;
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

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.comments).toBeDefined();
        expect(author.comments.edges).toHaveLength(1);
        expect(author.comments.pageInfo.pageSize).toStrictEqual(author.comments.edges.length)
        expect(author.comments.pageInfo.hasNextPage).toBe(false);
        expect(author.comments.pageInfo.hasPreviousPage).toBe(true)

        for (const commentEdge of author.comments.edges) {
          expect(commentEdge.node.id).toBeDefined();
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

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.collections).toBeDefined();
        expect(author.collections.edges).toHaveLength(1);
        expect(author.collections.pageInfo.pageSize).toStrictEqual(author.collections.edges.length)

        for (const collectionEdge of author.collections.edges) {
          expect(collectionEdge.node.id).toBeDefined();
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

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.collections).toBeDefined();
        expect(author.collections.edges).toHaveLength(1);
        expect(author.collections.pageInfo.pageSize).toStrictEqual(author.collections.edges.length)
        expect(author.collections.pageInfo.hasNextPage).toBe(false);
        expect(author.collections.pageInfo.hasPreviousPage).toBe(false);

        for (const collectionEdge of author.collections.edges) {
          expect(collectionEdge.node.id).toBeDefined();
        }

        cursor = author.collections.pageInfo.endCursor
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

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.collections).toBeDefined();
        expect(author.collections.edges).toHaveLength(0);
        expect(author.collections.pageInfo.pageSize).toStrictEqual(author.collections.edges.length)
        expect(author.collections.pageInfo.hasNextPage).toBe(false);
        expect(author.collections.pageInfo.hasPreviousPage).toBe(false);

        for (const collectionEdge of author.collections.edges) {
          expect(collectionEdge.node.id).toBeDefined();
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

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.likedPoems).toBeDefined();
        expect(author.likedPoems.edges).toHaveLength(2);
        expect(author.likedPoems.pageInfo.pageSize).toStrictEqual(author.likedPoems.edges.length)

        for (const likeEdge of author.likedPoems.edges) {
          expect(likeEdge.node.id).toBeDefined();
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

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.likedPoems).toBeDefined();
        expect(author.likedPoems.edges).toHaveLength(1);
        expect(author.likedPoems.pageInfo.pageSize).toStrictEqual(author.likedPoems.edges.length)
        expect(author.likedPoems.pageInfo.hasNextPage).toBe(true);
        expect(author.likedPoems.pageInfo.hasPreviousPage).toBe(false);

        for (const likeEdge of author.likedPoems.edges) {
          expect(likeEdge.node.id).toBeDefined();
        }

        cursor = author.likedPoems.pageInfo.endCursor;
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

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.likedPoems).toBeDefined();
        expect(author.likedPoems.edges).toHaveLength(1);
        expect(author.likedPoems.pageInfo.pageSize).toStrictEqual(author.likedPoems.edges.length)
        expect(author.likedPoems.pageInfo.hasNextPage).toBe(false);
        expect(author.likedPoems.pageInfo.hasPreviousPage).toBe(true);

        for (const likeEdge of author.likedPoems.edges) {
          expect(likeEdge.node.id).toBeDefined();
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

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.followedBy).toBeDefined();
        expect(author.followedBy.edges).toHaveLength(3);
        expect(author.followedBy.pageInfo.pageSize).toStrictEqual(author.followedBy.edges.length)

        for (const followerEdge of author.followedBy.edges) {
          expect(followerEdge.node.id).toBeDefined();
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

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.followedBy).toBeDefined();
        expect(author.followedBy.edges).toHaveLength(2);
        expect(author.followedBy.pageInfo.pageSize).toStrictEqual(author.followedBy.edges.length)
        expect(author.followedBy.pageInfo.hasNextPage).toBe(true);
        expect(author.followedBy.pageInfo.hasPreviousPage).toBe(false);

        for (const followerEdge of author.followedBy.edges) {
          expect(followerEdge.node.id).toBeDefined();
        }

        cursor = author.followedBy.pageInfo.endCursor;
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

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.followedBy).toBeDefined();
        expect(author.followedBy.edges).toHaveLength(1);
        expect(author.followedBy.pageInfo.pageSize).toStrictEqual(author.followedBy.edges.length)
        expect(author.followedBy.pageInfo.hasNextPage).toBe(false);
        expect(author.followedBy.pageInfo.hasPreviousPage).toBe(true);

        for (const followerEdge of author.followedBy.edges) {
          expect(followerEdge.node.id).toBeDefined();
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

      expect(response.body.kind).toStrictEqual("single")

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

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.following).toBeDefined();
        expect(author.following.edges).toHaveLength(3);
        expect(author.following.pageInfo.pageSize).toStrictEqual(author.following.edges.length)

        for (const followingEdge of author.following.edges) {
          expect(followingEdge.node.id).toBeDefined();
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

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const author = initialResponse.body.singleResult.data?.authorById;

        expect(author.following).toBeDefined();
        expect(author.following.edges).toHaveLength(2);
        expect(author.following.pageInfo.pageSize).toStrictEqual(author.following.edges.length)
        expect(author.following.pageInfo.hasNextPage).toBe(true);
        expect(author.following.pageInfo.hasPreviousPage).toBe(false);

        for (const followingEdge of author.following.edges) {
          expect(followingEdge.node.id).toBeDefined();
        }

        cursor = author.following.pageInfo.endCursor;
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

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const author = secondResponse.body.singleResult.data?.authorById;

        expect(author.following).toBeDefined();
        expect(author.following.edges).toHaveLength(1);
        expect(author.following.pageInfo.pageSize).toStrictEqual(author.following.edges.length)
        expect(author.following.pageInfo.hasNextPage).toBe(false);
        expect(author.following.pageInfo.hasPreviousPage).toBe(true);

        for (const followingEdge of author.following.edges) {
          expect(followingEdge.node.id).toBeDefined();
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

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorById;

        expect(author.followingCount).toBe(3);
      }
    }
  });
});
