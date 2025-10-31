import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import {
  GetAuthorByIdQuery,
  GetAuthorByUsernameQuery,
  GetAuthorsQuery,
  GetCommentsQuery,
  GetLikesQuery,
  GetPoemQuery,
  GetPoemsQuery,
  GetCommentQuery,
  GetCollectionsQuery,
  GetCollectionQuery,
  GetLikeQuery,
  GetSavedPoemsQuery,
  GetSavedPoemQuery,
  GetFollowedAuthorsQuery,
  GetFollowedAuthorQuery,
  LoginMutation,
  MeQuery,
} from "../../__generated__/graphql.js";

import {
  GET_AUTHORS,
  GET_AUTHOR_BY_ID,
  GET_AUTHOR_BY_USERNAME,
  GET_COLLECTION,
  GET_COLLECTIONS,
  GET_COMMENT,
  GET_COMMENTS,
  GET_FOLLOWED_AUTHOR,
  GET_FOLLOWED_AUTHORS,
  GET_LIKE,
  GET_LIKES,
  GET_POEM,
  GET_POEMS,
  GET_SAVED_POEM,
  GET_SAVED_POEMS,
} from "../../__tests__/queries/index.js";
import { LOGIN } from "../../__tests__/mutations/login.js";
import { ME } from "../../__tests__/queries/me.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { createServices } from "../../services/index.js";
import { randomUUID } from "crypto";
import { GraphQLFormattedError } from "graphql";

const verifyP2025Errors = ({errors, modelName}:{ errors: readonly GraphQLFormattedError[];  modelName: string}) => {
  expect(errors).toBeDefined();
  expect(errors).toHaveLength(1);
  expect(errors[0].extensions).toHaveProperty("code"),
  expect(errors[0].extensions.code).toStrictEqual("BAD_USER_INPUT"),
  expect(errors[0].message).toStrictEqual(`${modelName} does not exist`)
}

describe("Graphql Query integration tests", () => {
  // DB seeded with:
  // 4 authors
  // 8 poems (2 per author)
  // 4 collections (1 per author 2 poems per collection)
  // 16 comments (2 per poem and author)
  // 3 followed authors
  // 4 likes
  // 4 savedPoems
  const cache = new CacheAPI({ prefix: "Query" });
  const services = createServices({ prisma, cache });
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;
  const testId = randomUUID();
  let poems = [];
  let authors = [];
  let comments = [];
  let collections = [];
  let likes = [];
  let savedPoems = [];
  let followedAuthors = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ services });
    const result = await seed({ prisma });
    poems = result.poems;
    authors = result.authors;
    comments = result.comments;
    collections = result.collections;
    likes = result.likes;
    savedPoems = result.savedPoems;
    followedAuthors = result.followedAuthors;
  });
  afterAll(async () => {
    await testServer.cleanup();
    await cache.delByPattern({ pattern: "*" });
  });

  test("poems, without filter or pagination", async () => {
    const response = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const poems = response.body.singleResult.data?.poems;
      const errors = response.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();
      expect(poems.pageInfo.pageSize).toStrictEqual(8)
      expect(poems.edges).toHaveLength(poems.pageInfo.pageSize);
    }
  });

  test("poems, with pagination", async () => {
    const initialResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
      variables: { first: 4 },
    });

    expect(initialResponse.body.kind).toStrictEqual("single");

    let cursor = "";

    // get 4 first poems
    if (initialResponse.body.kind === "single") {
      const poems = initialResponse.body.singleResult.data?.poems;
      const errors = initialResponse.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();

      expect(poems.edges).toHaveLength(4);
      expect(poems.pageInfo.hasNextPage).toBe(true)
      expect(poems.pageInfo.hasPreviousPage).toBe(false)
      expect(poems.pageInfo.endCursor).toStrictEqual(poems.edges[poems.pageInfo.pageSize-1].node.id)
      cursor = poems.pageInfo.endCursor;
    }
    // get last 4 poems
    const secondResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
      variables: { first: 4, after: cursor },
    });

    expect(secondResponse.body.kind).toStrictEqual("single");

    if (secondResponse.body.kind === "single") {
      const poems = secondResponse.body.singleResult.data?.poems;
      const errors = secondResponse.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();

      expect(poems.pageInfo.pageSize).toBe(4);
      expect(poems.pageInfo.hasPreviousPage).toBe(true);
      expect(poems.pageInfo.hasNextPage).toBe(false)
    }
  });

  test("poems, with filter", async () => {
    // half of poems should end with 0
    const response = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
      variables: {
        filter: {
          filter: "0",
        },
      },
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const poems = response.body.singleResult.data?.poems;
      const errors = response.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();

      expect(poems.pageInfo.pageSize).toBe(4);

      poems.edges.forEach((edge) => {
        expect(edge.node.title.endsWith("0"));
      });
    }
  });

  test("poem", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: { id: poem.id },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem).toBeDefined();
        expect(poem.id).toBeDefined();
        expect(poem.title).toBeDefined();
        expect(poem.text).toBeDefined();
        expect(poem.datePublished).toBeDefined();
        expect(poem.views).toBe(0);
      }
    }
  });

  test("poem, with invalid id", async () => {
    const response = await testServer.executeOperation<GetPoemQuery>({
      query: GET_POEM,
      variables: { id: testId}
    })

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      expect(response.body.singleResult.data?.poem).toBeUndefined();
      verifyP2025Errors({ errors: response.body.singleResult.errors, modelName: "Poem"})
    }
  })

  test("authors, wihout pagination or filter", async () => {
    const response = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const authors = response.body.singleResult.data?.authors;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors.edges).toHaveLength(4);
    }
  });

  test("authors, with pagination", async () => {
    let cursor = "";
    const initialResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
      variables: {
        first: 3,
      },
    });

    expect(initialResponse.body.kind).toStrictEqual("single")

    if (initialResponse.body.kind === "single") {
      const authors = initialResponse.body.singleResult.data?.authors;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors.edges).toHaveLength(3);
      expect(authors.pageInfo.pageSize).toStrictEqual(authors.edges.length)
      expect(authors.pageInfo.hasNextPage).toBe(true)
      expect(authors.pageInfo.hasPreviousPage).toBe(false)

      cursor = authors.pageInfo.endCursor;
    }

    const secondResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
      variables: {
        first: 3,
        after: cursor,
      },
    });

    expect(secondResponse.body.kind).toStrictEqual("single")

    if (secondResponse.body.kind === "single") {
      const authors = secondResponse.body.singleResult.data?.authors;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors.edges).toHaveLength(1);
      expect(authors.pageInfo.pageSize).toStrictEqual(authors.edges.length)
      expect(authors.pageInfo.hasNextPage).toBe(false)
      expect(authors.pageInfo.hasPreviousPage).toBe(true)
    }
  });

  test("authors, with filter", async () => {
    const response = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
      variables: {
        usernameContains: "1",
      },
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const authors = response.body.singleResult.data?.authors;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors.edges).toHaveLength(1);
      expect(authors.edges[0].node.username).toBe("author1");
    }
  });

  test("authorByUsername", async () => {
    for (const author of authors) {
      const response =
        await testServer.executeOperation<GetAuthorByUsernameQuery>({
          query: GET_AUTHOR_BY_USERNAME,
          variables: {
            username: author.username,
          },
        });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const author = response.body.singleResult.data?.authorByUsername;

        expect(author).toBeDefined();
        assert(author !== null);
        expect(author.id).toBeDefined();
        expect(author.username).toBeDefined();
        expect(author.email).toBeDefined();
        // @ts-ignore
        expect(author.password).toBeUndefined();
      }
    }
  });

  test("authorByUsername, invalid username", async () => {
    const response = await testServer.executeOperation<GetAuthorByUsernameQuery>({
      query: GET_AUTHOR_BY_USERNAME,
      variables: { username: "kksdfsdf"}
    })

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const author = response.body.singleResult.data?.authorByUsername;
      const errors = response.body.singleResult.errors;

      expect(author).toBeUndefined();
      expect(errors).toBeDefined();
      verifyP2025Errors({ errors, modelName: "Author" });
    }
  })

  test("authorById", async () => {
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

        expect(author).toBeDefined();
        assert(author !== null);
        expect(author.id).toBeDefined();
        expect(author.username).toBeDefined();
        expect(author.email).toBeDefined();
        // @ts-ignore
        expect(author.password).toBeUndefined();
      }
    }
  });

  test("authorById, with invalid id", async () => {
    const response = await testServer.executeOperation<GetAuthorByIdQuery>({
      query: GET_AUTHOR_BY_ID,
      variables: { id: testId }
    })

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      expect(response.body.singleResult.data?.authorById).toBeUndefined();
      verifyP2025Errors({ errors: response.body.singleResult.errors, modelName: "Author" });
    }
  })

  test("comments, wihout pagination or filter", async () => {
    const response = await testServer.executeOperation<GetCommentsQuery>({
      query: GET_COMMENTS,
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const comments = response.body.singleResult.data?.comments;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(comments).toBeDefined();
      expect(comments.edges).toHaveLength(16);
      expect(comments.pageInfo.pageSize).toBe(16)
    }
  });

  test("comments, with pagination", async () => {
    let cursor = "";
    const initialResponse = await testServer.executeOperation<GetCommentsQuery>(
      {
        query: GET_COMMENTS,
        variables: {
          first: 10,
        },
      },
    );

    expect(initialResponse.body.kind).toStrictEqual("single")

    if (initialResponse.body.kind === "single") {
      const comments = initialResponse.body.singleResult.data?.comments;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(comments).toBeDefined();
      expect(comments.edges).toHaveLength(10);
      expect(comments.pageInfo.pageSize).toBe(10)
      expect(comments.pageInfo.hasNextPage).toBe(true)
      expect(comments.pageInfo.hasPreviousPage).toBe(false)

      cursor = comments.pageInfo.endCursor;
    }

    const secondResponse = await testServer.executeOperation<GetCommentsQuery>({
      query: GET_COMMENTS,
      variables: {
        first: 10,
        after: cursor,
      },
    });

    expect(secondResponse.body.kind).toStrictEqual("single")

    if (secondResponse.body.kind === "single") {
      const comments = secondResponse.body.singleResult.data?.comments;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(comments).toBeDefined();
      expect(comments.edges).toHaveLength(6);
      expect(comments.pageInfo.pageSize).toBe(6)
      expect(comments.pageInfo.hasNextPage).toBe(false)
      expect(comments.pageInfo.hasPreviousPage).toBe(true)
    }
  });

  test("comments, with filter", async () => {
    for (const author of authors) {
      const response =
        await testServer.executeOperation<GetCommentsQuery>({
          query: GET_COMMENTS,
          variables: {
            authorId: author.id,
          },
        });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const comments = response.body.singleResult.data?.comments;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(comments).toBeDefined();
        expect(comments.edges).toHaveLength(4);
        expect(comments.pageInfo.pageSize).toBe(4)
      }
    }

    for (const poem of poems) {
      const response =
        await testServer.executeOperation<GetCommentsQuery>({
          query: GET_COMMENTS,
          variables: {
            poemId: poem.id,
          },
        });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const comments = response.body.singleResult.data?.comments;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(comments).toBeDefined();
        expect(comments.edges).toHaveLength(2);
        expect(comments.pageInfo.pageSize).toBe(2)
      }
    }
  });

  test("comment", async () => {
    for (const comment of comments) {
      const response = await testServer.executeOperation<GetCommentQuery>({
        query: GET_COMMENT,
        variables: {
          id: comment.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const comment = response.body.singleResult.data?.comment;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(comment).toBeDefined();
        assert(comment !== null);

        expect(comment.id).toBeDefined();
        expect(comment.text).toBeDefined();
        expect(comment.datePublished).toBeDefined();
      }
    }
  });

  test("comment, with invalid id", async () => {
    const response = await testServer.executeOperation<GetCommentQuery>({
      query: GET_COMMENT,
      variables: { id: testId }
    })

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      expect(response.body.singleResult.data?.comment).toBeUndefined();
      verifyP2025Errors({ errors: response.body.singleResult.errors, modelName: "Comment"})
    }
  })

  test("collections, without pagination or filter", async () => {
    const response = await testServer.executeOperation<GetCollectionsQuery>({
      query: GET_COLLECTIONS,
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const collections = response.body.singleResult.data?.collections;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collections).toBeDefined();
      expect(collections.edges).toHaveLength(4)
      expect(collections.pageInfo.pageSize).toBe(4)
    }
  });

  test("collections, with pagination", async () => {
    let cursor = "";
    const initialResponse =
      await testServer.executeOperation<GetCollectionsQuery>({
        query: GET_COLLECTIONS,
        variables: {
          first: 3,
        },
      });

    expect(initialResponse.body.kind).toStrictEqual("single")

    if (initialResponse.body.kind === "single") {
      const collections = initialResponse.body.singleResult.data?.collections;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collections).toBeDefined();
      expect(collections.edges).toHaveLength(3);
      expect(collections.pageInfo.hasNextPage).toBe(true)
      expect(collections.pageInfo.hasPreviousPage).toBe(false)

      cursor = collections.pageInfo.endCursor;
    }

    const secondResponse =
      await testServer.executeOperation<GetCollectionsQuery>({
        query: GET_COLLECTIONS,
        variables: {
          first: 3,
          after: cursor,
        },
      });

    expect(secondResponse.body.kind).toStrictEqual("single")

    if (secondResponse.body.kind === "single") {
      const collections = secondResponse.body.singleResult.data?.collections;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collections).toBeDefined();
      expect(collections.edges).toHaveLength(1);
      expect(collections.pageInfo.hasNextPage).toBe(false)
      expect(collections.pageInfo.hasPreviousPage).toBe(true)
    }
  });

  test("collections, with filter", async () => {
    const response1 = await testServer.executeOperation<GetCollectionsQuery>({
      query: GET_COLLECTIONS,
      variables: {
        filter: {
          titleContains: "1",
        },
      },
    });

    expect(response1.body.kind).toStrictEqual("single")

    if (response1.body.kind === "single") {
      const collections = response1.body.singleResult.data?.collections;

      expect(collections).toBeDefined();
      expect(collections.edges).toHaveLength(1);
      expect(collections.pageInfo.pageSize).toBe(1);
    }

    const response2 = await testServer.executeOperation<GetCollectionsQuery>({
      query: GET_COLLECTIONS,
      variables: {
        filter: {
          authorNameContains: "author1",
        },
      },
    });

    expect(response2.body.kind).toStrictEqual("single")

    if (response2.body.kind === "single") {
      const collections = response2.body.singleResult.data?.collections;

      expect(collections).toBeDefined();
      expect(collections.edges).toHaveLength(1);
      expect(collections.pageInfo.pageSize).toBe(1);
    }

    for (const author of authors) {
      const response = await testServer.executeOperation<GetCollectionsQuery>(
        {
          query: GET_COLLECTIONS,
          variables: {
            filter: {
              authorId: author.id,
            },
          },
        },
      );

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const collections = response.body.singleResult.data?.collections;

        expect(collections).toBeDefined();
        expect(collections.edges).toHaveLength(1);
        expect(collections.pageInfo.pageSize).toBe(1);
      }
    }
  });

  test("collection, without pagination or filter", async () => {
    for (const collection of collections) {
      const response = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: {
          id: collection.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const collection = response.body.singleResult.data?.collection;

        expect(collection).toBeDefined();
        assert(collection !== null);
        expect(collection.id).toBeDefined();
        expect(collection.title).toBeDefined();
        expect(collection.dateCreated).toBeDefined();
      }
    }
  });

  test("collection, with invalid id", async () => {
    const response = await testServer.executeOperation<GetCollectionQuery>({
      query: GET_COLLECTION,
      variables: { id: testId }
    })

    expect(response.body.kind).toStrictEqual("single")

    expect(response.body.kind).toStrictEqual("single");
    if (response.body.kind === "single") {
      expect(response.body.singleResult.data?.collection).toBeUndefined();
      verifyP2025Errors({ errors: response.body.singleResult.errors, modelName: "Collection"})
    }
  })

  test("likes, without pagination or filter", async () => {
    const response = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const likes = response.body.singleResult.data?.likes;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(likes).toBeDefined();
      expect(likes.edges).toHaveLength(8);
      expect(likes.pageInfo.pageSize).toBe(8)
    }
  });

  test("likes, with pagination", async () => {
    let cursor = "";
    const initialResponse = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
      variables: {
        first: 5,
      },
    });

    expect(initialResponse.body.kind).toStrictEqual("single")

    if (initialResponse.body.kind === "single") {
      const likes = initialResponse.body.singleResult.data?.likes;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(likes).toBeDefined();
      expect(likes.edges).toHaveLength(5);
      expect(likes.pageInfo.pageSize).toBe(5)
      cursor = likes.pageInfo.endCursor;
    }

    const secondResponse = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
      variables: {
        first: 5,
        after: cursor,
      },
    });

    expect(secondResponse.body.kind).toStrictEqual("single")

    if (secondResponse.body.kind === "single") {
      const likes = secondResponse.body.singleResult.data?.likes;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(likes).toBeDefined();
      expect(likes.edges).toHaveLength(3);
      expect(likes.pageInfo.pageSize).toBe(3)
    }
  });

  test("likes, with filter", async () => {
    for (const author of authors) {
      const response = await testServer.executeOperation<GetLikesQuery>({
        query: GET_LIKES,
        variables: {
          authorId: author.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const likes = response.body.singleResult.data?.likes;
        expect(likes.edges).toHaveLength(2);
      }
    }

    for (const poem of poems) {
      const response = await testServer.executeOperation<GetLikesQuery>({
        query: GET_LIKES,
        variables: {
          poemId: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const likes = response.body.singleResult.data?.likes;
        expect(likes.edges).toHaveLength(1);
      }
    }
  });

  test("like", async () => {
    for (const like of likes) {
      const response = await testServer.executeOperation<GetLikeQuery>({
        query: GET_LIKE,
        variables: {
          id: like.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const like = response.body.singleResult.data?.like;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(like).toBeDefined();
        expect(like.id).toBeDefined();
        expect(like.author).toBeDefined();
        expect(like.poem).toBeDefined();
        expect(like.datePublished).toBeDefined();
      }
    }
  });

  test("like, with invalid id", async () => {
    const response = await testServer.executeOperation<GetLikeQuery>({
      query: GET_LIKE,
      variables: { id: testId }
    })

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      expect(response.body.singleResult.data?.like).toBeUndefined();
      verifyP2025Errors({ errors: response.body.singleResult.errors, modelName: "Like" })
    }
  })

  test("savedPoems, witout pagination or filter", async () => {
    const response = await testServer.executeOperation<GetSavedPoemsQuery>({
      query: GET_SAVED_POEMS,
    });

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const savedPoems = response.body.singleResult.data?.savedPoems;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(savedPoems.edges).toHaveLength(8);
    }
  });

  test("savedPoems, with pagination", async () => {
    let cursor = "";
    const initialResponse =
      await testServer.executeOperation<GetSavedPoemsQuery>({
        query: GET_SAVED_POEMS,
        variables: {
          first: 5,
        },
      });

    expect(initialResponse.body.kind).toStrictEqual("single")

    if (initialResponse.body.kind === "single") {
      const savedPoems = initialResponse.body.singleResult.data?.savedPoems;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(savedPoems.edges).toHaveLength(5);
      expect(savedPoems.pageInfo.pageSize).toBe(5);
      expect(savedPoems.pageInfo.hasNextPage).toBe(true);
      expect(savedPoems.pageInfo.hasPreviousPage).toBe(false);

      cursor = savedPoems.pageInfo.endCursor;
    }

    const secondResponse =
      await testServer.executeOperation<GetSavedPoemsQuery>({
        query: GET_SAVED_POEMS,
        variables: {
          first: 5,
          after: cursor,
        },
      });

    expect(secondResponse.body.kind).toStrictEqual("single")

    if (secondResponse.body.kind === "single") {
      const savedPoems = secondResponse.body.singleResult.data?.savedPoems;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(savedPoems.edges).toHaveLength(3);
      expect(savedPoems.pageInfo.pageSize).toBe(3);
      expect(savedPoems.pageInfo.hasNextPage).toBe(false);
      expect(savedPoems.pageInfo.hasPreviousPage).toBe(true);
    }
  });

  test("savedPoems, with filter", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetSavedPoemsQuery>({
        query: GET_SAVED_POEMS,
        variables: {
          poemId: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const savedPoems = response.body.singleResult.data?.savedPoems;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(savedPoems).toBeDefined();
        assert(savedPoems !== null);
        expect(savedPoems.edges).toHaveLength(1);
      }
    }

    for (const author of authors) {
      const response = await testServer.executeOperation<GetSavedPoemsQuery>({
        query: GET_SAVED_POEMS,
        variables: {
          authorId: author.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const savedPoems = response.body.singleResult.data?.savedPoems;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(savedPoems).toBeDefined();
        assert(savedPoems !== null);
        expect(savedPoems.edges).toHaveLength(2);
      }
    }
  });

  test("savedPoem", async () => {
    for (const savedPoem of savedPoems) {
      const response = await testServer.executeOperation<GetSavedPoemQuery>({
        query: GET_SAVED_POEM,
        variables: {
          id: savedPoem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const savedPoem = response.body.singleResult.data?.savedPoem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(savedPoem).toBeDefined();
        expect(savedPoem.id).toBeDefined();
        expect(savedPoem.dateSaved).toBeDefined();
      }
    }
  });

  test("savedPoem, with invalid id", async () => {
    const response = await testServer.executeOperation<GetSavedPoemQuery>({
      query: GET_SAVED_POEM,
      variables: { id: testId}
    })

    expect(response.body.kind).toStrictEqual("single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.data?.savedPoem).toBeUndefined();
      verifyP2025Errors({ errors: response.body.singleResult.errors, modelName: "SavedPoem"})
    }
  })

  test("followedAuthors, without pagination or filter", async () => {
    const response = await testServer.executeOperation<GetFollowedAuthorsQuery>(
      {
        query: GET_FOLLOWED_AUTHORS,
      },
    );

    expect(response.body.kind).toStrictEqual("single")

    if (response.body.kind === "single") {
      const followedAuthors = response.body.singleResult.data?.followedAuthors;

      expect(followedAuthors).toBeDefined();
      expect(followedAuthors.edges).toHaveLength(12);
    }
  });

  test("followedAuthors, with pagination", async () => {
    let cursor = "";
    const initialResponse =
      await testServer.executeOperation<GetFollowedAuthorsQuery>({
        query: GET_FOLLOWED_AUTHORS,
        variables: {
          first: 10,
        },
      });

    expect(initialResponse.body.kind).toStrictEqual("single")

    if (initialResponse.body.kind === "single") {
      const followedAuthors =
        initialResponse.body.singleResult.data?.followedAuthors;

      expect(followedAuthors).toBeDefined();
      expect(followedAuthors.edges).toHaveLength(10);
      expect(followedAuthors.pageInfo.pageSize).toBe(10);
      expect(followedAuthors.pageInfo.hasNextPage).toBe(true)
      expect(followedAuthors.pageInfo.hasPreviousPage).toBe(false)

      cursor = followedAuthors.pageInfo.endCursor;
    }

    const secondResponse =
      await testServer.executeOperation<GetFollowedAuthorsQuery>({
        query: GET_FOLLOWED_AUTHORS,
        variables: { first: 10, after: cursor },
      });

    expect(secondResponse.body.kind).toStrictEqual("single")

    if (secondResponse.body.kind === "single") {
      const followedAuthors =
        secondResponse.body.singleResult.data?.followedAuthors;

      expect(followedAuthors).toBeDefined();
      expect(followedAuthors.edges).toHaveLength(2);
      expect(followedAuthors.pageInfo.pageSize).toBe(2);
      expect(followedAuthors.pageInfo.hasNextPage).toBe(false)
      expect(followedAuthors.pageInfo.hasPreviousPage).toBe(true)
    }
  });

  test("followedAuthors, with filter", async () => {
      for (const author of authors) {
        const followerResponse =
          await testServer.executeOperation<GetFollowedAuthorsQuery>({
            query: GET_FOLLOWED_AUTHORS,
            variables: {
              followerId: author.id,
            },
          });

        expect(followerResponse.body.kind).toStrictEqual("single")

        if (followerResponse.body.kind === "single") {
          const followedAuthors =
            followerResponse.body.singleResult.data?.followedAuthors;

          expect(followedAuthors).toBeDefined();
          expect(followedAuthors.edges).toHaveLength(3);
        }

        const followingResponse =
          await testServer.executeOperation<GetFollowedAuthorsQuery>({
            query: GET_FOLLOWED_AUTHORS,
            variables: {
              followingId: author.id,
            },
          });

        expect(followingResponse.body.kind).toStrictEqual("single")

        if (followingResponse.body.kind === "single") {
          const followedAuthors =
            followingResponse.body.singleResult.data?.followedAuthors;

          expect(followedAuthors).toBeDefined();
          expect(followedAuthors.edges).toHaveLength(3);
        }
      }
  });

  test("followedAuthor", async () => {
    for (const followedAuthor of followedAuthors) {
      const response =
        await testServer.executeOperation<GetFollowedAuthorQuery>({
          query: GET_FOLLOWED_AUTHOR,
          variables: {
            id: followedAuthor.id,
          },
        });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const followedAuthor =
          response.body.singleResult.data?.followedAuthor;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(followedAuthor).toBeDefined();
        expect(followedAuthor.id).toBeDefined();
        expect(followedAuthor.dateFollowed).toBeDefined();
      }
    }
  });

  test("followedAuthor, with invalid id", async () => {
    const response = await testServer.executeOperation<GetFollowedAuthorQuery>({
      query: GET_FOLLOWED_AUTHOR,
      variables: { id: testId }
    })

    expect(response.body.kind).toStrictEqual("single");

    if (response.body.kind === "single") {
      expect(response.body.singleResult.data?.followedAuthor).toBeUndefined();
      verifyP2025Errors({ errors: response.body.singleResult.errors, modelName: "FollowedAuthor" })
    }
  })

  test("me", async () => {
    const loginResponse = await testServer.executeOperation<LoginMutation>({
      query: LOGIN,
      variables: {
        username: "author1",
        password: "password",
      },
    });

    expect(loginResponse.body.kind).toStrictEqual("single")

    if (loginResponse.body.kind === "single") {
      const login = loginResponse.body.singleResult.data?.login;
      const response = await testServer.executeOperation<MeQuery>({
        query: ME,
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const me = response.body.singleResult.data?.me;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(me.id).toStrictEqual(login.author.id);
        expect(me.username).toStrictEqual(login.author.username);
      }
    }
  });
});
