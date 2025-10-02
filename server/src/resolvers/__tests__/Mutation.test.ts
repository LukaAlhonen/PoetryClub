import {
  createTestServer,
  TestServer,
} from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import { PoemAPI } from "../../datasources/poem-api.js";
import {
  CreateAuthorMutation,
  CreateCollectionMutation,
  CreateCommentMutation,
  CreateFollowedAuthorMutation,
  CreateLikeMutation,
  CreatePoemMutation,
  CreateSavedPoemMutation,
  GetAuthorByIdQuery,
  GetCollectionQuery,
  GetCommentQuery,
  GetFollowedAuthorQuery,
  GetLikeQuery,
  GetPoemQuery,
  GetSavedPoemQuery,
  IncrementPoemViewsMutation,
  LoginMutation,
  LogoutMutation,
  RemoveAuthorMutation,
  RemoveCollectionMutation,
  RemoveCommentMutation,
  RemoveFollowedAuthorMutation,
  RemoveLikeMutation,
  RemovePoemMutation,
  RemoveSavedPoemMutation,
  SignupMutation,
  UpdateAuthorInput,
  UpdateAuthorMutation,
  UpdateCollectionInput,
  UpdateCollectionMutation,
  UpdatePoemInput,
  UpdatePoemMutation,
} from "../../__generated__/graphql.js";

import {
  CREATE_AUTHOR,
  CREATE_COLLECTION,
  CREATE_COMMENT,
  CREATE_FOLLOWED_AUTHOR,
  CREATE_LIKE,
  CREATE_POEM,
  CREATE_SAVED_POEM,
  LOGIN,
  REMOVE_AUTHOR,
  REMOVE_COLLECTION,
  REMOVE_COMMENT,
  REMOVE_FOLLOWED_AUTHOR,
  REMOVE_LIKE,
  REMOVE_POEM,
  REMOVE_SAVED_POEM,
  SIGNUP,
  UPDATE_AUTHOR,
  UPDATE_COLLECTION,
  UPDATE_POEM,
} from "../../__tests__/mutations/index.js";
import {
  AuthorModel,
  CollectionModel,
  CommentModel,
  FollowedAuthorModel,
  LikeModel,
  PoemModel,
  SavedPoemModel,
} from "../../models.js";
import { GET_AUTHOR_BY_ID } from "../../__tests__/queries/authorById.js";
import { GET_COLLECTION } from "../../__tests__/queries/collection.js";
import { GET_COMMENT } from "../../__tests__/queries/comment.js";
import { GET_FOLLOWED_AUTHOR } from "../../__tests__/queries/followedAuthor.js";
import { GET_LIKE } from "../../__tests__/queries/like.js";
import { GET_POEM } from "../../__tests__/queries/poem.js";
import { GET_SAVED_POEM } from "../../__tests__/queries/savedPoem.js";
import { LOGOUT } from "../../__tests__/mutations/logout.js";
import { INCREMENT_POEM_VIEWS } from "../../__tests__/mutations/incrementPoemViews.js";
import { CacheAPI } from "../../cache/cache-api.js";

const testLogin = async ({
  username = "author1",
  password = "password",
  testServer,
}: {
  username?: String;
  password?: String;
  testServer: TestServer;
}) => {
  const response = await testServer.executeOperation<LoginMutation>({
    query: LOGIN,
    variables: {
      username,
      password,
    },
  });

  if (response.body.kind === "single") {
    const login = response.body.singleResult.data?.login;
    const errors = response.body.singleResult.errors;

    if (errors) console.error(errors);

    return login;
  } else {
    throw new Error("Invalid response type");
  }
};

describe("Graphql Mutation integration tests", () => {
  // DB seeded with:
  // 4 authors
  // 8 poems (2 per author)
  // 4 collections (1 per author 2 poems per collection)
  // 16 comments (2 per poem and author)
  // 3 followed authors
  // 4 likes
  // 4 savedPoems
  const cache = new CacheAPI({ prefix: "Mutation" });
  const poemAPI = new PoemAPI(prisma, cache);
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;
  let poems: PoemModel[] = [];
  let authors: AuthorModel[] = [];
  let collections: CollectionModel[] = [];
  let comments: CommentModel[] = [];
  let likes: LikeModel[] = [];
  let savedPoems: SavedPoemModel[] = [];
  let followedAuthors: FollowedAuthorModel[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ poemAPI });
    const result = await seed({ prisma });
    poems = result.poems;
    authors = result.authors;
    collections = result.collections;
    comments = result.comments;
    likes = result.likes;
    savedPoems = result.savedPoems;
    followedAuthors = result.followedAuthors;
  });
  afterAll(async () => {
    await testServer.cleanup();
  });

  test("login, succeeds", async () => {
    const response = await testServer.executeOperation<LoginMutation>({
      query: LOGIN,
      variables: {
        username: "author1",
        password: "password",
      },
    });

    if (response.body.kind === "single") {
      const login = response.body.singleResult.data?.login;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(login).toBeDefined();
      expect(login.token).toBeDefined();
      expect(login.token.length).toBeGreaterThan(0);
      expect(login.author).toBeDefined();
      expect(login.author.id).toBeDefined();
      expect(login.author.username).toStrictEqual("author1");
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("login, invalid password", async () => {
    const response = await testServer.executeOperation<LoginMutation>({
      query: LOGIN,
      variables: {
        username: "author1",
        password: "1234",
      },
    });

    if (response.body.kind === "single") {
      const login = response.body.singleResult.data?.login;
      const errors = response.body.singleResult.errors;

      expect(login).toBeUndefined();
      expect(errors).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("login, invalid username", async () => {
    const response = await testServer.executeOperation<LoginMutation>({
      query: LOGIN,
      variables: {
        username: "peter",
        password: "password",
      },
    });

    if (response.body.kind === "single") {
      const login = response.body.singleResult.data?.login;
      const errors = response.body.singleResult.errors;

      expect(login).toBeUndefined();
      expect(errors).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("logout", async () => {
    const login = await testLogin({ testServer });
    const response = await testServer.executeOperation<LogoutMutation>({
      query: LOGOUT,
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const logout = response.body.singleResult.data?.logout;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(logout).toBe(true);
    }

    // make sure token was invalidated
    const response2 = await testServer.executeOperation<RemoveAuthorMutation>({
      query: REMOVE_AUTHOR,
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response2.body.kind === "single") {
      const author = response2.body.singleResult.data?.removeAuthor;
      const errors = response2.body.singleResult.errors;

      expect(author).toBeUndefined();
      expect(errors).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createPoem", async () => {
    const login = await testLogin({ testServer });

    const title = "my test poem";
    const text = "my test poem text";

    const response = await testServer.executeOperation<CreatePoemMutation>({
      query: CREATE_POEM,
      variables: {
        input: {
          title,
          text,
        },
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const poem = response.body.singleResult.data?.createPoem;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(poem).toBeDefined();
      expect(poem.id).toBeDefined();
      expect(poem.datePublished).toBeDefined();
      expect(poem.title).toStrictEqual(title);
      expect(poem.text).toStrictEqual(text);
      expect(poem.author.id).toStrictEqual(login.author.id);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createPoem, without authentication", async () => {
    const title = "my test poem";
    const text = "my test poem text";

    const response = await testServer.executeOperation<CreatePoemMutation>({
      query: CREATE_POEM,
      variables: {
        input: {
          title,
          text,
        },
      },
    });

    if (response.body.kind === "single") {
      const poem = response.body.singleResult.data?.createPoem;
      const errors = response.body.singleResult.errors;

      expect(poem).toBeUndefined();
      expect(errors).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createAuthor", async () => {
    const username = "luka";
    const password = "password1234";
    const email = "luka@domain.com";
    const response = await testServer.executeOperation<CreateAuthorMutation>({
      query: CREATE_AUTHOR,
      variables: {
        input: {
          username,
          password,
          email,
        },
      },
    });

    if (response.body.kind === "single") {
      const author = response.body.singleResult.data?.createAuthor;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(author).toBeDefined();
      expect(author.id).toBeDefined();
      expect(author.dateJoined).toBeDefined();
      expect(author.username).toStrictEqual(username);
      expect(author.email).toStrictEqual(email);
      //@ts-ignore
      expect(author.password).toBeUndefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("signup", async () => {
    const username = "luka";
    const password = "password1234";
    const email = "luka@domain.com";
    const response = await testServer.executeOperation<SignupMutation>({
      query: SIGNUP,
      variables: {
        input: {
          username,
          password,
          email,
        },
      },
    });

    if (response.body.kind === "single") {
      const author = response.body.singleResult.data?.signup;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(author).toBeDefined();
      expect(author.id).toBeDefined();
      expect(author.dateJoined).toBeDefined();
      expect(author.username).toStrictEqual(username);
      expect(author.email).toStrictEqual(email);
      //@ts-ignore
      expect(author.password).toBeUndefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createCollection", async () => {
    const login = await testLogin({ testServer });
    const title = "test collection title";

    const response =
      await testServer.executeOperation<CreateCollectionMutation>({
        query: CREATE_COLLECTION,
        variables: {
          title,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.createCollection;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(collection).toBeDefined();
      expect(collection.id).toBeDefined();
      expect(collection.title).toBeDefined();
      expect(collection.poems).toStrictEqual([]);
      expect(collection.dateCreated).toBeDefined();
      expect(collection.author.id).toStrictEqual(login.author.id);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createCollection, without authentication", async () => {
    const title = "test collection title";

    const response =
      await testServer.executeOperation<CreateCollectionMutation>({
        query: CREATE_COLLECTION,
        variables: {
          title,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.createCollection;
      const errors = response.body.singleResult.errors;

      expect(errors).toBeDefined();
      expect(collection).toBeUndefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createComment", async () => {
    const login = await testLogin({ testServer });
    const text = "test comment text";
    const response = await testServer.executeOperation<CreateCommentMutation>({
      query: CREATE_COMMENT,
      variables: {
        poemId: poems[0].id,
        text,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const comment = response.body.singleResult.data?.createComment;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(comment).toBeDefined();
      expect(comment.id).toBeDefined();
      expect(comment.datePublished).toBeDefined();
      expect(comment.text).toStrictEqual(text);
      expect(comment.author.id).toStrictEqual(login.author.id);
      expect(comment.poem.id).toStrictEqual(poems[0].id);
    }
  });

  test("createComment, without authentication", async () => {
    const text = "test comment text";
    const response = await testServer.executeOperation<CreateCommentMutation>({
      query: CREATE_COMMENT,
      variables: {
        poemId: poems[0].id,
        text,
      },
    });

    if (response.body.kind === "single") {
      const comment = response.body.singleResult.data?.createComment;
      const errors = response.body.singleResult.errors;

      expect(comment).toBeUndefined();
      expect(errors).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createLike", async () => {
    const login = await testLogin({ testServer });
    // find poems that have not been liked by author1
    const testPoems = poems.filter((poem) => poem.authorId !== login.author.id);
    const response = await testServer.executeOperation<CreateLikeMutation>({
      query: CREATE_LIKE,
      variables: {
        poemId: testPoems[0].id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const like = response.body.singleResult.data?.createLike;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(like).toBeDefined();
      expect(like.id).toBeDefined();
      expect(like.datePublished).toBeDefined();
      expect(like.author.id).toStrictEqual(login.author.id);
      expect(like.poem.id).toStrictEqual(testPoems[0].id);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createLike, without authentication", async () => {
    const response = await testServer.executeOperation<CreateLikeMutation>({
      query: CREATE_LIKE,
      variables: {
        poemId: poems[0].id,
      },
    });

    if (response.body.kind === "single") {
      const like = response.body.singleResult.data?.createLike;
      const errors = response.body.singleResult.errors;

      expect(like).toBeUndefined();
      expect(errors).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createSavedPoem", async () => {
    const login = await testLogin({ testServer });
    // db seeded with authors who have saved their own poems
    const testPoems = poems.filter((poem) => poem.authorId !== login.author.id);

    const response = await testServer.executeOperation<CreateSavedPoemMutation>(
      {
        query: CREATE_SAVED_POEM,
        variables: {
          poemId: testPoems[0].id,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      },
    );

    if (response.body.kind === "single") {
      const savedPoem = response.body.singleResult.data?.createSavedPoem;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(savedPoem).toBeDefined();
      expect(savedPoem.id).toBeDefined();
      expect(savedPoem.dateSaved).toBeDefined();
      expect(savedPoem.author.id).toStrictEqual(login.author.id);
      expect(savedPoem.poem.id).toStrictEqual(testPoems[0].id);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createSavedPoem, without authentication", async () => {
    const response = await testServer.executeOperation<CreateSavedPoemMutation>(
      {
        query: CREATE_SAVED_POEM,
        variables: {
          poemId: poems[0].id,
        },
      },
    );

    if (response.body.kind === "single") {
      const savedPoem = response.body.singleResult.data?.createSavedPoem;
      const errors = response.body.singleResult.errors;

      expect(errors).toBeDefined();
      expect(savedPoem).toBeUndefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createFollowedAuthor", async () => {
    const login = await testLogin({ testServer });

    // create author to follow, since all seeded authors already follow each other
    let author = null;

    const authorResponse =
      await testServer.executeOperation<CreateAuthorMutation>({
        query: CREATE_AUTHOR,
        variables: {
          input: {
            username: "john doe",
            email: "john.doe@domain.com",
            password: "password",
          },
        },
      });

    if (authorResponse.body.kind === "single") {
      author = authorResponse.body.singleResult.data?.createAuthor;
    } else {
      throw new Error("invalid response kind");
    }

    const response =
      await testServer.executeOperation<CreateFollowedAuthorMutation>({
        query: CREATE_FOLLOWED_AUTHOR,
        variables: {
          followingId: author.id,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (response.body.kind === "single") {
      const followedAuthor =
        response.body.singleResult.data?.createFollowedAuthor;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(followedAuthor).toBeDefined();
      expect(followedAuthor.dateFollowed).toBeDefined();
      expect(followedAuthor.follower.id).toStrictEqual(login.author.id);
      expect(followedAuthor.following.id).toStrictEqual(author.id);
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("createFollowedAuthor, without authentication", async () => {
    // create author to follow, since all seeded authors already follow each other
    let author = null;

    const authorResponse =
      await testServer.executeOperation<CreateAuthorMutation>({
        query: CREATE_AUTHOR,
        variables: {
          input: {
            username: "john doe",
            email: "john.doe@domain.com",
            password: "password",
          },
        },
      });

    if (authorResponse.body.kind === "single") {
      author = authorResponse.body.singleResult.data?.createAuthor;
    } else {
      throw new Error("invalid response kind");
    }

    const response =
      await testServer.executeOperation<CreateFollowedAuthorMutation>({
        query: CREATE_FOLLOWED_AUTHOR,
        variables: {
          followingId: author.id,
        },
      });

    if (response.body.kind === "single") {
      const followedAuthor =
        response.body.singleResult.data?.createFollowedAuthor;
      const errors = response.body.singleResult.errors;

      expect(errors).toBeDefined();
      expect(followedAuthor).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeAuthor", async () => {
    const login = await testLogin({ testServer });

    const response = await testServer.executeOperation<RemoveAuthorMutation>({
      query: REMOVE_AUTHOR,
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const author = response.body.singleResult.data?.removeAuthor;
      const errors = response.body.singleResult.errors;

      if (errors) console.log(errors);

      expect(author).toBeDefined();
      expect(author.id).toBeDefined();

      // make sure author was removed
      const response2 = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: author.id,
        },
      });

      if (response2.body.kind === "single") {
        const author = response2.body.singleResult.data?.authorById;
        const errors = response2.body.singleResult.errors;

        expect(errors).toBeDefined();
        expect(author).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeCollection", async () => {
    const login = await testLogin({ testServer });

    const collectionToRemove = collections.filter(
      (collection) => collection.authorId === login.author.id,
    )[0];

    const response =
      await testServer.executeOperation<RemoveCollectionMutation>({
        query: REMOVE_COLLECTION,
        variables: {
          collectionId: collectionToRemove.id,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.removeCollection;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collection).toBeDefined();
      expect(collection.id).toBeDefined();

      // make sure collection was removed
      const response2 = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: {
          id: collection.id,
        },
      });

      if (response2.body.kind === "single") {
        const collection = response2.body.singleResult.data?.collection;
        const errors = response2.body.singleResult.errors;

        expect(collection).toBeUndefined();
        expect(errors).toBeDefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeCollection, without authentication", async () => {
    const response =
      await testServer.executeOperation<RemoveCollectionMutation>({
        query: REMOVE_COLLECTION,
        variables: {
          collectionId: collections[0].id,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.removeCollection;
      const errors = response.body.singleResult.errors;

      expect(collection).toBeUndefined();
      expect(errors).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }

    // make sure collection was not removed
    const response2 = await testServer.executeOperation<GetCollectionQuery>({
      query: GET_COLLECTION,
      variables: {
        id: collections[0].id,
      },
    });

    if (response2.body.kind === "single") {
      const collection = response2.body.singleResult.data?.collection;
      const errors = response2.body.singleResult.errors;

      expect(collection).toBeDefined();
      expect(errors).toBeUndefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeCollection, without authorisation", async () => {
    const login = await testLogin({ testServer });

    // get first collection not owned by author
    const collectionToRemove = collections.filter(
      (collection) => collection.authorId !== login.author.id,
    )[0];

    const response =
      await testServer.executeOperation<RemoveCollectionMutation>({
        query: REMOVE_COLLECTION,
        variables: {
          collectionId: collectionToRemove.id,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.removeCollection;
      const errors = response.body.singleResult.errors;

      expect(collection).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure collection was not removed
      const response2 = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: {
          id: collectionToRemove.id,
        },
      });

      if (response2.body.kind === "single") {
        const collection = response2.body.singleResult.data?.collection;
        const errors = response2.body.singleResult.errors;

        expect(collection).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeComment", async () => {
    const login = await testLogin({ testServer });
    const commentToRemove = comments.filter(
      (comment) => comment.authorId === login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemoveCommentMutation>({
      query: REMOVE_COMMENT,
      variables: {
        commentId: commentToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const comment = result.body.singleResult.data?.removeComment;
      const errors = result.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(comment).toBeDefined();
      expect(comment.id).toBeDefined();

      // make sure comment was removed
      const result2 = await testServer.executeOperation<GetCommentQuery>({
        query: GET_COMMENT,
        variables: {
          id: comment.id,
        },
      });

      if (result2.body.kind === "single") {
        const comment = result2.body.singleResult.data?.comment;
        const errors = result2.body.singleResult.errors;

        expect(comment).toBeUndefined();
        expect(errors).toBeDefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeComment, without authentication", async () => {
    const commentToRemove = comments[0];

    const result = await testServer.executeOperation<RemoveCommentMutation>({
      query: REMOVE_COMMENT,
      variables: {
        commentId: commentToRemove.id,
      },
    });

    if (result.body.kind === "single") {
      const comment = result.body.singleResult.data?.removeComment;
      const errors = result.body.singleResult.errors;

      expect(comment).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure comment was not removed
      const result2 = await testServer.executeOperation<GetCommentQuery>({
        query: GET_COMMENT,
        variables: {
          id: commentToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const comment = result2.body.singleResult.data?.comment;
        const errors = result2.body.singleResult.errors;

        expect(comment).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeComment, without authorisation", async () => {
    const login = await testLogin({ testServer });
    const commentToRemove = comments.filter(
      (comment) => comment.authorId !== login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemoveCommentMutation>({
      query: REMOVE_COMMENT,
      variables: {
        commentId: commentToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const comment = result.body.singleResult.data?.removeComment;
      const errors = result.body.singleResult.errors;

      expect(comment).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure comment was not removed
      const result2 = await testServer.executeOperation<GetCommentQuery>({
        query: GET_COMMENT,
        variables: {
          id: commentToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const comment = result2.body.singleResult.data?.comment;
        const errors = result2.body.singleResult.errors;

        expect(comment).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeFollowedAuthor", async () => {
    const login = await testLogin({ testServer });
    const followedAuthorToRemove = followedAuthors.filter(
      (followedAuthor) => followedAuthor.followerId === login.author.id,
    )[0];

    const result =
      await testServer.executeOperation<RemoveFollowedAuthorMutation>({
        query: REMOVE_FOLLOWED_AUTHOR,
        variables: {
          followedAuthorId: followedAuthorToRemove.id,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (result.body.kind === "single") {
      const followedAuthor =
        result.body.singleResult.data?.removeFollowedAuthor;
      const errors = result.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(followedAuthor).toBeDefined();
      expect(followedAuthor.id).toBeDefined();

      // make sure followedAuthor was removed
      const result2 = await testServer.executeOperation<GetFollowedAuthorQuery>(
        {
          query: GET_FOLLOWED_AUTHOR,
          variables: {
            id: followedAuthor.id,
          },
        },
      );

      if (result2.body.kind === "single") {
        const followedAuthor = result2.body.singleResult.data?.followedAuthor;
        const errors = result2.body.singleResult.errors;

        expect(followedAuthor).toBeUndefined();
        expect(errors).toBeDefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeFollowedAuthor, without authentication", async () => {
    const followedAuthorToRemove = followedAuthors[0];

    const result =
      await testServer.executeOperation<RemoveFollowedAuthorMutation>({
        query: REMOVE_FOLLOWED_AUTHOR,
        variables: {
          followedAuthorId: followedAuthorToRemove.id,
        },
      });

    if (result.body.kind === "single") {
      const followedAuthor =
        result.body.singleResult.data?.removeFollowedAuthor;
      const errors = result.body.singleResult.errors;

      expect(followedAuthor).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure followedAuthor was not removed
      const result2 = await testServer.executeOperation<GetFollowedAuthorQuery>(
        {
          query: GET_FOLLOWED_AUTHOR,
          variables: {
            id: followedAuthorToRemove.id,
          },
        },
      );

      if (result2.body.kind === "single") {
        const followedAuthor = result2.body.singleResult.data?.followedAuthor;
        const errors = result2.body.singleResult.errors;

        expect(followedAuthor).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeFollowedAuthor, without authorisation", async () => {
    const login = await testLogin({ testServer });
    const followedAuthorToRemove = followedAuthors.filter(
      (followedAuthor) => followedAuthor.followerId !== login.author.id,
    )[0];

    const result =
      await testServer.executeOperation<RemoveFollowedAuthorMutation>({
        query: REMOVE_FOLLOWED_AUTHOR,
        variables: {
          followedAuthorId: followedAuthorToRemove.id,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (result.body.kind === "single") {
      const followedAuthor =
        result.body.singleResult.data?.removeFollowedAuthor;
      const errors = result.body.singleResult.errors;

      expect(followedAuthor).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure followedAuthor was not removed
      const result2 = await testServer.executeOperation<GetFollowedAuthorQuery>(
        {
          query: GET_FOLLOWED_AUTHOR,
          variables: {
            id: followedAuthorToRemove.id,
          },
        },
      );

      if (result2.body.kind === "single") {
        const followedAuthor = result2.body.singleResult.data?.followedAuthor;
        const errors = result2.body.singleResult.errors;

        expect(followedAuthor).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeLike", async () => {
    const login = await testLogin({ testServer });
    const likeToRemove = likes.filter(
      (like) => like.authorId === login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemoveLikeMutation>({
      query: REMOVE_LIKE,
      variables: {
        likeId: likeToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const like = result.body.singleResult.data?.removeLike;
      const errors = result.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(like).toBeDefined();
      expect(like.id).toBeDefined();

      // make sure like was removed
      const result2 = await testServer.executeOperation<GetLikeQuery>({
        query: GET_LIKE,
        variables: {
          id: like.id,
        },
      });

      if (result2.body.kind === "single") {
        const like = result2.body.singleResult.data?.like;
        const errors = result2.body.singleResult.errors;

        expect(like).toBeUndefined();
        expect(errors).toBeDefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeLike, without authentication", async () => {
    const likeToRemove = likes[0];

    const result = await testServer.executeOperation<RemoveLikeMutation>({
      query: REMOVE_LIKE,
      variables: {
        likeId: likeToRemove.id,
      },
    });

    if (result.body.kind === "single") {
      const like = result.body.singleResult.data?.removeLike;
      const errors = result.body.singleResult.errors;

      expect(like).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure like was not removed
      const result2 = await testServer.executeOperation<GetLikeQuery>({
        query: GET_LIKE,
        variables: {
          id: likeToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const like = result2.body.singleResult.data?.like;
        const errors = result2.body.singleResult.errors;

        expect(like).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeLike, without authorisation", async () => {
    const login = await testLogin({ testServer });
    const likeToRemove = likes.filter(
      (like) => like.authorId !== login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemoveLikeMutation>({
      query: REMOVE_LIKE,
      variables: {
        likeId: likeToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const like = result.body.singleResult.data?.removeLike;
      const errors = result.body.singleResult.errors;

      expect(like).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure like was not removed
      const result2 = await testServer.executeOperation<GetLikeQuery>({
        query: GET_LIKE,
        variables: {
          id: likeToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const like = result2.body.singleResult.data?.like;
        const errors = result2.body.singleResult.errors;

        expect(like).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removePoem", async () => {
    const login = await testLogin({ testServer });
    const poemToRemove = poems.filter(
      (poem) => poem.authorId === login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemovePoemMutation>({
      query: REMOVE_POEM,
      variables: {
        poemId: poemToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const poem = result.body.singleResult.data?.removePoem;
      const errors = result.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(poem).toBeDefined();
      expect(poem.id).toBeDefined();

      // make sure poem was removed
      const result2 = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      if (result2.body.kind === "single") {
        const poem = result2.body.singleResult.data?.poem;
        const errors = result2.body.singleResult.errors;

        expect(poem).toBeUndefined();
        expect(errors).toBeDefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removePoem, without authentication", async () => {
    const poemToRemove = poems[0];

    const result = await testServer.executeOperation<RemovePoemMutation>({
      query: REMOVE_POEM,
      variables: {
        poemId: poemToRemove.id,
      },
    });

    if (result.body.kind === "single") {
      const poem = result.body.singleResult.data?.removePoem;
      const errors = result.body.singleResult.errors;

      expect(poem).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure poem was not removed
      const result2 = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poemToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const poem = result2.body.singleResult.data?.poem;
        const errors = result2.body.singleResult.errors;

        expect(poem).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removePoem, without authorisation", async () => {
    const login = await testLogin({ testServer });
    const poemToRemove = poems.filter(
      (poem) => poem.authorId !== login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemovePoemMutation>({
      query: REMOVE_POEM,
      variables: {
        poemId: poemToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const poem = result.body.singleResult.data?.removePoem;
      const errors = result.body.singleResult.errors;

      expect(poem).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure poem was not removed
      const result2 = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poemToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const poem = result2.body.singleResult.data?.poem;
        const errors = result2.body.singleResult.errors;

        expect(poem).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeSavedPoem", async () => {
    const login = await testLogin({ testServer });
    const savedPoemToRemove = savedPoems.filter(
      (savedPoem) => savedPoem.authorId === login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemoveSavedPoemMutation>({
      query: REMOVE_SAVED_POEM,
      variables: {
        savedPoemId: savedPoemToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const savedPoem = result.body.singleResult.data?.removeSavedPoem;
      const errors = result.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(savedPoem).toBeDefined();
      expect(savedPoem.id).toBeDefined();

      // make sure savedPoem was removed
      const result2 = await testServer.executeOperation<GetSavedPoemQuery>({
        query: GET_SAVED_POEM,
        variables: {
          id: savedPoem.id,
        },
      });

      if (result2.body.kind === "single") {
        const savedPoem = result2.body.singleResult.data?.savedPoem;
        const errors = result2.body.singleResult.errors;

        expect(savedPoem).toBeUndefined();
        expect(errors).toBeDefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeSavedPoem, without authentication", async () => {
    const savedPoemToRemove = savedPoems[0];

    const result = await testServer.executeOperation<RemoveSavedPoemMutation>({
      query: REMOVE_SAVED_POEM,
      variables: {
        savedPoemId: savedPoemToRemove.id,
      },
    });

    if (result.body.kind === "single") {
      const savedPoem = result.body.singleResult.data?.removeSavedPoem;
      const errors = result.body.singleResult.errors;

      expect(savedPoem).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure savedPoem was not removed
      const result2 = await testServer.executeOperation<GetSavedPoemQuery>({
        query: GET_SAVED_POEM,
        variables: {
          id: savedPoemToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const savedPoem = result2.body.singleResult.data?.savedPoem;
        const errors = result2.body.singleResult.errors;

        expect(savedPoem).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("removeSavedPoem, without authorisation", async () => {
    const login = await testLogin({ testServer });
    const savedPoemToRemove = savedPoems.filter(
      (savedPoem) => savedPoem.authorId !== login.author.id,
    )[0];

    const result = await testServer.executeOperation<RemoveSavedPoemMutation>({
      query: REMOVE_SAVED_POEM,
      variables: {
        savedPoemId: savedPoemToRemove.id,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (result.body.kind === "single") {
      const savedPoem = result.body.singleResult.data?.removeSavedPoem;
      const errors = result.body.singleResult.errors;

      expect(savedPoem).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure savedPoem was not removed
      const result2 = await testServer.executeOperation<GetSavedPoemQuery>({
        query: GET_SAVED_POEM,
        variables: {
          id: savedPoemToRemove.id,
        },
      });

      if (result2.body.kind === "single") {
        const savedPoem = result2.body.singleResult.data?.savedPoem;
        const errors = result2.body.singleResult.errors;

        expect(savedPoem).toBeDefined();
        expect(errors).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("updateAuthor", async () => {
    const login = await testLogin({ testServer });
    const authorToUpdate = authors[0];

    const input: UpdateAuthorInput = {
      username: "billy_gates",
      email: "billy_boy@gmail.com",
      password: "coolguybilly",
    };

    const response = await testServer.executeOperation<UpdateAuthorMutation>({
      query: UPDATE_AUTHOR,
      variables: {
        input,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const author = response.body.singleResult.data?.updateAuthor;
      const errors = response.body.singleResult.errors;

      expect(author).toBeDefined();
      expect(errors).toBeUndefined();

      // make sure token was invalidated
      const response2 = await testServer.executeOperation<RemoveAuthorMutation>(
        {
          query: REMOVE_AUTHOR,
          headers: {
            authorization: `Bearer ${login.token}`,
          },
        },
      );

      if (response2.body.kind === "single") {
        const author = response2.body.singleResult.data?.removeAuthor;
        const errors = response2.body.singleResult.errors;

        expect(author).toBeUndefined();
        expect(errors).toBeDefined();
      } else {
        throw new Error("invalid response kind");
      }

      // make sure author was updated
      const response3 = await testServer.executeOperation<GetAuthorByIdQuery>({
        query: GET_AUTHOR_BY_ID,
        variables: {
          id: authorToUpdate.id,
        },
      });

      if (response3.body.kind === "single") {
        const author = response3.body.singleResult.data?.authorById;
        const errors = response3.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(author).toBeDefined();
        expect(author.username).toStrictEqual(input.username);
        expect(author.email).toStrictEqual(input.email);
      } else {
        throw new Error("invalid response kind");
      }

      // make sure login works with new username and password
      const newLogin = await testLogin({
        username: input.username,
        password: input.password,
        testServer,
      });

      expect(newLogin).toBeDefined();
      expect(newLogin.author.id).toStrictEqual(authorToUpdate.id);
      expect(newLogin.token).toBeDefined();
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("updateCollection", async () => {
    const login = await testLogin({ testServer });

    const collectionToUpdate = collections.filter(
      (collection) => collection.authorId === login.author.id,
    )[0];

    const input: UpdateCollectionInput = {
      id: collectionToUpdate.id,
      title: "super cool collection title",
    };

    const response =
      await testServer.executeOperation<UpdateCollectionMutation>({
        query: UPDATE_COLLECTION,
        variables: {
          input,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.updateCollection;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(collection).toBeDefined();

      // make sure collection was updated
      const response2 = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: { id: collectionToUpdate.id },
      });

      if (response2.body.kind === "single") {
        const collection = response2.body.singleResult.data?.collection;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(collection.title).toStrictEqual(input.title);
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("updateCollection, without authentication", async () => {
    const collectionToUpdate = collections[0];

    const input: UpdateCollectionInput = {
      id: collectionToUpdate.id,
      title: "super cool collection title",
    };

    const response =
      await testServer.executeOperation<UpdateCollectionMutation>({
        query: UPDATE_COLLECTION,
        variables: {
          input,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.updateCollection;
      const errors = response.body.singleResult.errors;

      expect(collection).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure collection was not updated
      const response2 = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: { id: collectionToUpdate.id },
      });

      if (response2.body.kind === "single") {
        const collection = response2.body.singleResult.data?.collection;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(collection.title).toStrictEqual(collectionToUpdate.title);
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("updateCollection, without authorisation", async () => {
    const login = await testLogin({ testServer });

    const collectionToUpdate = collections.filter(
      (collection) => collection.authorId !== login.author.id,
    )[0];

    const input: UpdateCollectionInput = {
      id: collectionToUpdate.id,
      title: "super cool collection title",
    };

    const response =
      await testServer.executeOperation<UpdateCollectionMutation>({
        query: UPDATE_COLLECTION,
        variables: {
          input,
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      });

    if (response.body.kind === "single") {
      const collection = response.body.singleResult.data?.updateCollection;
      const errors = response.body.singleResult.errors;

      expect(collection).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure collection was not updated
      const response2 = await testServer.executeOperation<GetCollectionQuery>({
        query: GET_COLLECTION,
        variables: { id: collectionToUpdate.id },
      });

      if (response2.body.kind === "single") {
        const collection = response2.body.singleResult.data?.collection;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(collection.title).toStrictEqual(collectionToUpdate.title);
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("updatePoem", async () => {
    const login = await testLogin({ testServer });

    const poemToUpdate = poems.filter(
      (poem) => poem.authorId === login.author.id,
    )[0];

    const input: UpdatePoemInput = {
      poemId: poemToUpdate.id,
      title: "super cool collection title",
      text: "super cool poem text",
      views: 10,
    };

    const response = await testServer.executeOperation<UpdatePoemMutation>({
      query: UPDATE_POEM,
      variables: {
        input,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const poem = response.body.singleResult.data?.updatePoem;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(poem).toBeDefined();

      // make sure poem was updated
      const response2 = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: { id: poemToUpdate.id },
      });

      if (response2.body.kind === "single") {
        const poem = response2.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.title).toStrictEqual(input.title);
        expect(poem.text).toStrictEqual(input.text);
        expect(poem.views).toStrictEqual(input.views);
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("updatePoem, without authentication", async () => {
    const poemToUpdate = poems[0];

    const input: UpdatePoemInput = {
      poemId: poemToUpdate.id,
      title: "super cool collection title",
      text: "super cool poem text",
      views: 10,
    };

    const response = await testServer.executeOperation<UpdatePoemMutation>({
      query: UPDATE_POEM,
      variables: {
        input,
      },
    });

    if (response.body.kind === "single") {
      const poem = response.body.singleResult.data?.updatePoem;
      const errors = response.body.singleResult.errors;

      expect(poem).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure poem was not updated
      const response2 = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: { id: poemToUpdate.id },
      });

      if (response2.body.kind === "single") {
        const poem = response2.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.title).toStrictEqual(poemToUpdate.title);
        expect(poem.text).toStrictEqual(poemToUpdate.text);
        expect(poem.views).toStrictEqual(poemToUpdate.views);
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("updatePoem, without authorisation", async () => {
    const login = await testLogin({ testServer });

    const poemToUpdate = poems.filter(
      (poem) => poem.authorId !== login.author.id,
    )[0];

    const input: UpdatePoemInput = {
      poemId: poemToUpdate.id,
      title: "super cool collection title",
      text: "super cool poem text",
      views: 10,
    };

    const response = await testServer.executeOperation<UpdatePoemMutation>({
      query: UPDATE_POEM,
      variables: {
        input,
      },
      headers: {
        authorization: `Bearer ${login.token}`,
      },
    });

    if (response.body.kind === "single") {
      const poem = response.body.singleResult.data?.updatePoem;
      const errors = response.body.singleResult.errors;

      expect(poem).toBeUndefined();
      expect(errors).toBeDefined();

      // make sure poem was not updated
      const response2 = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: { id: poemToUpdate.id },
      });

      if (response2.body.kind === "single") {
        const poem = response2.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.title).toStrictEqual(poemToUpdate.title);
        expect(poem.text).toStrictEqual(poemToUpdate.text);
        expect(poem.views).toStrictEqual(poemToUpdate.views);
      } else {
        throw new Error("invalid response kind");
      }
    } else {
      throw new Error("invalid response kind");
    }
  });

  test("incrementPoemViews", async () => {
    const poemToUpdate = poems[0];
    const response =
      await testServer.executeOperation<IncrementPoemViewsMutation>({
        query: INCREMENT_POEM_VIEWS,
        variables: {
          poemId: poemToUpdate.id,
        },
      });

    if (response.body.kind === "single") {
      const poem = response.body.singleResult.data?.incrementPoemViews;
      const errors = response.body.singleResult.errors;

      if (errors) console.error(errors);

      expect(poem.views).toBe(1);
    }
  });
});
