import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import { PoemAPI } from "../../datasources/poem-api.js";
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

describe("Graphql Query integration tests", () => {
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

  beforeEach(async () => {
    testServer = await createTestServer({ poemAPI });
    await seed({ prisma });
  });
  afterAll(async () => {
    await testServer.cleanup();
  });

  test("poems, without filter or pagination, succeeds", async () => {
    const response = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
    });

    if (response.body.kind === "single") {
      const poems = response.body.singleResult.data?.poems;
      const errors = response.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();
      expect(poems.length).toBe(8);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("poems, with pagination, succeeds", async () => {
    const initialResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
      variables: { limit: 4 },
    });

    let cursor = "";

    // get 4 first poems
    if (initialResponse.body.kind === "single") {
      const poems = initialResponse.body.singleResult.data?.poems;
      const errors = initialResponse.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();

      expect(poems.length).toBe(4);
    } else {
      throw new Error("invalid response kind");
    }

    // get last 4 poems
    const secondResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
      variables: { limit: 4, cursor },
    });

    if (secondResponse.body.kind === "single") {
      const poems = secondResponse.body.singleResult.data?.poems;
      const errors = secondResponse.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();

      expect(poems.length).toBe(4);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("poems, with filter, succeeds", async () => {
    // half of poems should end with 0
    const response = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
      variables: {
        filter: {
          titleContains: "0",
        },
      },
    });

    if (response.body.kind === "single") {
      const poems = response.body.singleResult.data?.poems;
      const errors = response.body.singleResult.errors;
      if (errors) console.error(errors);

      expect(poems).toBeDefined();

      expect(poems.length).toBe(4);

      poems.forEach((poem) => {
        expect(poem.title.endsWith("0"));
      });
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("poem, succeeds", async () => {
    const poemsResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
    });
    if (poemsResponse.body.kind === "single") {
      const poems = poemsResponse.body.singleResult.data?.poems;
      for (const poem of poems) {
        const response = await testServer.executeOperation<GetPoemQuery>({
          query: GET_POEM,
          variables: { id: poem.id },
        });

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
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("authors, wihout pagination or filter, succeeds", async () => {
    const response = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (response.body.kind === "single") {
      const authors = response.body.singleResult.data?.authors;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors).toHaveLength(4);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("authors, with pagination, succeeds", async () => {
    let cursor = "";
    const initialResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
      variables: {
        limit: 3,
      },
    });

    if (initialResponse.body.kind === "single") {
      const authors = initialResponse.body.singleResult.data?.authors;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors).toHaveLength(3);

      cursor = authors[authors.length - 1].id;
    } else {
      throw new Error("invalid response kind");
    }

    const secondResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
      variables: {
        limit: 3,
        cursor,
      },
    });

    if (secondResponse.body.kind === "single") {
      const authors = secondResponse.body.singleResult.data?.authors;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors).toHaveLength(1);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("authors, with filter, succeeds", async () => {
    const response = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
      variables: {
        usernameContains: "1",
      },
    });

    if (response.body.kind === "single") {
      const authors = response.body.singleResult.data?.authors;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(authors).toBeDefined();
      expect(authors).toHaveLength(1);
      expect(authors[0].username).toBe("author1");
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("authorByUsername, succeeds", async () => {
    const authorsResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (authorsResponse.body.kind === "single") {
      const authors = authorsResponse.body.singleResult.data?.authors;
      for (const author of authors) {
        const response =
          await testServer.executeOperation<GetAuthorByUsernameQuery>({
            query: GET_AUTHOR_BY_USERNAME,
            variables: {
              username: author.username,
            },
          });

        if (response.body.kind === "single") {
          const author = response.body.singleResult.data?.authorByUsername;

          expect(author).toBeDefined();
          assert(author !== null);
          expect(author.id).toBeDefined();
          expect(author.username).toBeDefined();
          expect(author.email).toBeDefined();
          // @ts-ignore
          expect(author.password).toBeUndefined();
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("authorById, success", async () => {
    const authorsResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (authorsResponse.body.kind === "single") {
      const authors = authorsResponse.body.singleResult.data?.authors;
      for (const author of authors) {
        const response = await testServer.executeOperation<GetAuthorByIdQuery>({
          query: GET_AUTHOR_BY_ID,
          variables: {
            id: author.id,
          },
        });

        if (response.body.kind === "single") {
          const author = response.body.singleResult.data?.authorById;

          expect(author).toBeDefined();
          assert(author !== null);
          expect(author.id).toBeDefined();
          expect(author.username).toBeDefined();
          expect(author.email).toBeDefined();
          // @ts-ignore
          expect(author.password).toBeUndefined();
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("comments, wihout pagination or filter, succeeds", async () => {
    const response = await testServer.executeOperation<GetCommentsQuery>({
      query: GET_COMMENTS,
    });

    if (response.body.kind === "single") {
      const comments = response.body.singleResult.data?.comments;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(comments).toBeDefined();
      expect(comments.length).toBe(16);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("comments, with pagination, succeeds", async () => {
    let cursor = "";
    const initialResponse = await testServer.executeOperation<GetCommentsQuery>(
      {
        query: GET_COMMENTS,
        variables: {
          limit: 10,
        },
      },
    );

    if (initialResponse.body.kind === "single") {
      const comments = initialResponse.body.singleResult.data?.comments;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(comments).toBeDefined();
      expect(comments.length).toBe(10);

      cursor = comments[comments.length - 1].id;
    } else {
      throw new Error("invalid response kind");
    }

    const secondResponse = await testServer.executeOperation<GetCommentsQuery>({
      query: GET_COMMENTS,
      variables: {
        limit: 10,
        cursor,
      },
    });

    if (secondResponse.body.kind === "single") {
      const comments = secondResponse.body.singleResult.data?.comments;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(comments).toBeDefined();
      expect(comments.length).toBe(6);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("comments, with filter", async () => {
    const authorsResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (authorsResponse.body.kind === "single") {
      const authors = authorsResponse.body.singleResult.data.authors;

      for (const author of authors) {
        const commentResponse =
          await testServer.executeOperation<GetCommentsQuery>({
            query: GET_COMMENTS,
            variables: {
              authorId: author.id,
            },
          });

        if (commentResponse.body.kind === "single") {
          const comments = commentResponse.body.singleResult.data?.comments;
          const errors = commentResponse.body.singleResult.errors;

          if (errors) console.error(errors);

          expect(comments).toBeDefined();
          expect(comments.length).toBe(4);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }

    const poemsResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
    });

    if (poemsResponse.body.kind === "single") {
      const poems = poemsResponse.body.singleResult.data.poems;

      for (const poem of poems) {
        const commentResponse =
          await testServer.executeOperation<GetCommentsQuery>({
            query: GET_COMMENTS,
            variables: {
              poemId: poem.id,
            },
          });

        if (commentResponse.body.kind === "single") {
          const comments = commentResponse.body.singleResult.data?.comments;
          const errors = commentResponse.body.singleResult.errors;

          if (errors) console.error(errors);

          expect(comments).toBeDefined();
          expect(comments.length).toBe(2);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("comment, succeeds", async () => {
    const commentsResponse =
      await testServer.executeOperation<GetCommentsQuery>({
        query: GET_COMMENTS,
      });

    if (commentsResponse.body.kind === "single") {
      const comments = commentsResponse.body.singleResult.data?.comments;

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

          expect(comment).toBeDefined();
          assert(comment !== null);

          expect(comment.id).toBeDefined();
          expect(comment.text).toBeDefined();
          expect(comment.datePublished).toBeDefined();
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("collections, without pagination or filter, succeeds", async () => {
    const response = await testServer.executeOperation<GetCollectionsQuery>({
      query: GET_COLLECTIONS,
    });

    if (response.body.kind === "single") {
      const collections = response.body.singleResult.data?.collections;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collections).toBeDefined();
      expect(collections.length).toBe(4);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("collections, with pagination, succeeds", async () => {
    let cursor = "";
    const initialResponse =
      await testServer.executeOperation<GetCollectionsQuery>({
        query: GET_COLLECTIONS,
        variables: {
          limit: 3,
        },
      });

    if (initialResponse.body.kind === "single") {
      const collections = initialResponse.body.singleResult.data?.collections;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collections).toBeDefined();
      expect(collections.length).toBe(3);

      cursor = collections[collections.length - 1].id;
    } else {
      throw new Error("invalid response kind");
    }

    const secondResponse =
      await testServer.executeOperation<GetCollectionsQuery>({
        query: GET_COLLECTIONS,
        variables: {
          limit: 3,
          cursor,
        },
      });

    if (secondResponse.body.kind === "single") {
      const collections = secondResponse.body.singleResult.data?.collections;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collections).toBeDefined();
      expect(collections.length).toBe(1);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("collections, with filter, succeeds", async () => {
    const response1 = await testServer.executeOperation<GetCollectionsQuery>({
      query: GET_COLLECTIONS,
      variables: {
        filter: {
          titleContains: "1",
        },
      },
    });

    if (response1.body.kind === "single") {
      const collections = response1.body.singleResult.data?.collections;

      expect(collections).toBeDefined();
      expect(collections.length).toBe(1);
    } else {
      throw new Error("invalid response kind");
    }

    const response2 = await testServer.executeOperation<GetCollectionsQuery>({
      query: GET_COLLECTIONS,
      variables: {
        filter: {
          authorNameContains: "author1",
        },
      },
    });

    if (response2.body.kind === "single") {
      const collections = response2.body.singleResult.data?.collections;

      expect(collections).toBeDefined();
      expect(collections.length).toBe(1);
    } else {
      throw new Error("invalid response kind");
    }

    const authorsResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (authorsResponse.body.kind === "single") {
      const authors = authorsResponse.body.singleResult.data?.authors;

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

        if (response.body.kind === "single") {
          const collections = response.body.singleResult.data?.collections;

          expect(collections).toBeDefined();
          expect(collections.length).toBe(1);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("collection, without pagination or filter, succeeds", async () => {
    const collectionsResponse =
      await testServer.executeOperation<GetCollectionsQuery>({
        query: GET_COLLECTIONS,
      });

    if (collectionsResponse.body.kind === "single") {
      const collections =
        collectionsResponse.body.singleResult.data?.collections;

      for (const collection of collections) {
        const response = await testServer.executeOperation<GetCollectionQuery>({
          query: GET_COLLECTION,
          variables: {
            id: collection.id,
          },
        });

        if (response.body.kind === "single") {
          const collection = response.body.singleResult.data?.collection;

          expect(collection).toBeDefined();
          assert(collection !== null);
          expect(collection.id).toBeDefined();
          expect(collection.title).toBeDefined();
          expect(collection.dateCreated).toBeDefined();
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("likes, without pagination or filter, succeeds", async () => {
    const response = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
    });

    if (response.body.kind === "single") {
      const likes = response.body.singleResult.data?.likes;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(likes).toBeDefined();
      expect(likes.length).toBe(8);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("likes, with pagination, succeeds", async () => {
    let cursor = "";
    const initialResponse = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
      variables: {
        limit: 5,
      },
    });

    if (initialResponse.body.kind === "single") {
      const likes = initialResponse.body.singleResult.data?.likes;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(likes).toBeDefined();
      expect(likes.length).toBe(5);
      cursor = likes[likes.length - 1].id;
    } else {
      throw new Error("invalid response kind");
    }

    const secondResponse = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
      variables: {
        limit: 5,
        cursor,
      },
    });

    if (secondResponse.body.kind === "single") {
      const likes = secondResponse.body.singleResult.data?.likes;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(likes).toBeDefined();
      expect(likes.length).toBe(3);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("likes, with filter, succeeds", async () => {
    const authorsResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (authorsResponse.body.kind === "single") {
      const authors = authorsResponse.body.singleResult.data?.authors;

      for (const author of authors) {
        const response = await testServer.executeOperation<GetLikesQuery>({
          query: GET_LIKES,
          variables: {
            authorId: author.id,
          },
        });

        if (response.body.kind === "single") {
          const likes = response.body.singleResult.data?.likes;
          expect(likes.length).toBe(2);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }

    const poemsResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
    });

    if (poemsResponse.body.kind === "single") {
      const poems = poemsResponse.body.singleResult.data?.poems;

      for (const poem of poems) {
        const response = await testServer.executeOperation<GetLikesQuery>({
          query: GET_LIKES,
          variables: {
            poemId: poem.id,
          },
        });

        if (response.body.kind === "single") {
          const likes = response.body.singleResult.data?.likes;
          expect(likes.length).toBe(1);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("like, succeeds", async () => {
    const likesResponse = await testServer.executeOperation<GetLikesQuery>({
      query: GET_LIKES,
    });

    if (likesResponse.body.kind === "single") {
      for (const like of likesResponse.body.singleResult.data?.likes) {
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

          expect(like).toBeDefined();
          expect(like.id).toBeDefined();
          expect(like.author).toBeDefined();
          expect(like.poem).toBeDefined();
          expect(like.datePublished).toBeDefined();
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("savedPoems, witout pagination or filter, succeeds", async () => {
    const response = await testServer.executeOperation<GetSavedPoemsQuery>({
      query: GET_SAVED_POEMS,
    });

    if (response.body.kind === "single") {
      const savedPoems = response.body.singleResult.data?.savedPoems;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(savedPoems.length).toBe(8);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("savedPoems, with pagination", async () => {
    let cursor = "";
    const initialResponse =
      await testServer.executeOperation<GetSavedPoemsQuery>({
        query: GET_SAVED_POEMS,
        variables: {
          limit: 5,
        },
      });

    if (initialResponse.body.kind === "single") {
      const savedPoems = initialResponse.body.singleResult.data?.savedPoems;
      const errors = initialResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(savedPoems.length).toBe(5);

      cursor = savedPoems[savedPoems.length - 1].id;
    } else {
      throw new Error("invalid response kind");
    }

    const secondResponse =
      await testServer.executeOperation<GetSavedPoemsQuery>({
        query: GET_SAVED_POEMS,
        variables: {
          limit: 5,
          cursor,
        },
      });

    if (secondResponse.body.kind === "single") {
      const savedPoems = secondResponse.body.singleResult.data?.savedPoems;
      const errors = secondResponse.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(savedPoems.length).toBe(3);
    }
  });

  test("savedPoems, with filter, succeeds", async () => {
    const poemsResponse = await testServer.executeOperation<GetPoemsQuery>({
      query: GET_POEMS,
    });

    if (poemsResponse.body.kind === "single") {
      for (const poem of poemsResponse.body.singleResult.data.poems) {
        const response = await testServer.executeOperation<GetSavedPoemsQuery>({
          query: GET_SAVED_POEMS,
          variables: {
            poemId: poem.id,
          },
        });

        if (response.body.kind === "single") {
          const savedPoems = response.body.singleResult.data?.savedPoems;
          const errors = response.body.singleResult.errors;

          if (errors) console.error(errors);

          expect(savedPoems).toBeDefined();
          assert(savedPoems !== null);
          expect(savedPoems.length).toBe(1);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }

    const authorsResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (authorsResponse.body.kind === "single") {
      for (const author of authorsResponse.body.singleResult.data.authors) {
        const response = await testServer.executeOperation<GetSavedPoemsQuery>({
          query: GET_SAVED_POEMS,
          variables: {
            authorId: author.id,
          },
        });

        if (response.body.kind === "single") {
          const savedPoems = response.body.singleResult.data?.savedPoems;
          const errors = response.body.singleResult.errors;

          if (errors) console.error(errors);

          expect(savedPoems).toBeDefined();
          assert(savedPoems !== null);
          expect(savedPoems.length).toBe(2);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("savedPoem, succeeds", async () => {
    const savedPoemsResponse =
      await testServer.executeOperation<GetSavedPoemsQuery>({
        query: GET_SAVED_POEMS,
      });

    if (savedPoemsResponse.body.kind === "single") {
      for (const savedPoem of savedPoemsResponse.body.singleResult.data
        ?.savedPoems) {
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

          expect(savedPoem).toBeDefined();
          expect(savedPoem.id).toBeDefined();
          expect(savedPoem.dateSaved).toBeDefined();
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("followedAuthors, without pagination or filter, succeeds", async () => {
    const response = await testServer.executeOperation<GetFollowedAuthorsQuery>(
      {
        query: GET_FOLLOWED_AUTHORS,
      },
    );

    if (response.body.kind === "single") {
      const followedAuthors = response.body.singleResult.data?.followedAuthors;

      expect(followedAuthors).toBeDefined();
      expect(followedAuthors).toHaveLength(12);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("followedAuthors, with pagination, succeeds", async () => {
    let cursor = "";
    const initialResponse =
      await testServer.executeOperation<GetFollowedAuthorsQuery>({
        query: GET_FOLLOWED_AUTHORS,
        variables: {
          limit: 10,
        },
      });

    if (initialResponse.body.kind === "single") {
      const followedAuthors =
        initialResponse.body.singleResult.data?.followedAuthors;

      expect(followedAuthors).toBeDefined();
      expect(followedAuthors).toHaveLength(10);

      cursor = followedAuthors[followedAuthors.length - 1].id;
    } else {
      throw new Error("invalid response kind");
    }

    const secondResponse =
      await testServer.executeOperation<GetFollowedAuthorsQuery>({
        query: GET_FOLLOWED_AUTHORS,
        variables: { limit: 10, cursor },
      });

    if (secondResponse.body.kind === "single") {
      const followedAuthors =
        secondResponse.body.singleResult.data?.followedAuthors;

      expect(followedAuthors).toBeDefined();
      expect(followedAuthors).toHaveLength(2);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("followedAuthors, with filter, succeeds", async () => {
    const authorsResponse = await testServer.executeOperation<GetAuthorsQuery>({
      query: GET_AUTHORS,
    });

    if (authorsResponse.body.kind === "single") {
      const authors = authorsResponse.body.singleResult.data?.authors;

      for (const author of authors) {
        const followerResponse =
          await testServer.executeOperation<GetFollowedAuthorsQuery>({
            query: GET_FOLLOWED_AUTHORS,
            variables: {
              followerId: author.id,
            },
          });

        if (followerResponse.body.kind === "single") {
          const followedAuthors =
            followerResponse.body.singleResult.data?.followedAuthors;

          expect(followedAuthors).toBeDefined();
          expect(followedAuthors).toHaveLength(3);
        } else {
          throw new Error("invalid response kind");
        }

        const followingResponse =
          await testServer.executeOperation<GetFollowedAuthorsQuery>({
            query: GET_FOLLOWED_AUTHORS,
            variables: {
              followingId: author.id,
            },
          });

        if (followingResponse.body.kind === "single") {
          const followedAuthors =
            followingResponse.body.singleResult.data?.followedAuthors;

          expect(followedAuthors).toBeDefined();
          expect(followedAuthors).toHaveLength(3);
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("followedAuthor, succeeds", async () => {
    const followedAuthorsResponse =
      await testServer.executeOperation<GetFollowedAuthorsQuery>({
        query: GET_FOLLOWED_AUTHORS,
      });

    if (followedAuthorsResponse.body.kind === "single") {
      for (const followedAuthor of followedAuthorsResponse.body.singleResult
        .data?.followedAuthors) {
        const response =
          await testServer.executeOperation<GetFollowedAuthorQuery>({
            query: GET_FOLLOWED_AUTHOR,
            variables: {
              id: followedAuthor.id,
            },
          });

        if (response.body.kind === "single") {
          const followedAuthor =
            response.body.singleResult.data?.followedAuthor;
          const errors = response.body.singleResult.errors;

          if (errors) console.error(errors);

          expect(followedAuthor).toBeDefined();
          expect(followedAuthor.id).toBeDefined();
          expect(followedAuthor.dateFollowed).toBeDefined();
        } else {
          throw new Error("invalid response kind");
        }
      }
    } else {
      throw new Error("invalid response kind");
    }
  });
});
