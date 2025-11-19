import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import { GetPoemQuery, GetPoemsQuery, LoginMutation } from "../../__generated__/graphql.js";

import { GET_POEM, GET_POEMS } from "../../__tests__/queries/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { createServices } from "../../services/index.js";
import { PoemWithRelations } from "../../types/extended-types.js";
import { LOGIN } from "../../__tests__/mutations/login.js";

describe("Graphql Mutation integration tests", () => {
  // DB seeded with:
  // 4 authors
  // 8 poems (2 per author)
  // 4 collections (1 per author 2 poems per collection)
  // 16 comments (2 per poem and author)
  // 3 followed authors
  // 4 likes
  // 4 savedPoems
  const cache = new CacheAPI({ prefix: "Poem" });
  const services = createServices({ prisma, cache });
  let testServer: Awaited<ReturnType<typeof createTestServer> | null> = null;

  // let poems: NonNullable<GetPoemsQuery["poems"]> = [];
  let poems: PoemWithRelations[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    testServer = await createTestServer({ services });
    const result = await seed({ prisma });
    poems = result.poems;
    // const response = await testServer.executeOperation<GetPoemsQuery>({
    //   query: GET_POEMS,
    // });

    // if (response.body.kind === "single") {
    //   poems = response.body.singleResult.data?.poems.edges.map((edge) => edge.node);
    // }
  });
  afterAll(async () => {
    await testServer.cleanup();
    await cache.delByPattern({ pattern: "*" });
  });

  test("author", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.author).toBeDefined();
        expect(poem.author.id).toBeDefined();
        // @ts-ignore
        expect(poem.author.password).toBeUndefined();
      }
    }
  });

  test("inCollection", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.inCollection).toBeDefined();
      }
    }
  });

  test("comments, without pagination", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.comments).toBeDefined();
        expect(poem.comments.edges).toHaveLength(2);
        expect(poem.comments.pageInfo.pageSize).toStrictEqual(poem.comments.edges.length)

        for (const commentEdge of poem.comments.edges) {
          expect(commentEdge.node.id).toBeDefined();
        }
      }
    }
  });

  test("comments, with pagination", async () => {
    let cursor = "";
    for (const poem of poems) {
      const initialResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          commentsLimit: 1,
        },
      });

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const poem = initialResponse.body.singleResult.data?.poem;
        const errors = initialResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.comments).toBeDefined();
        expect(poem.comments.edges).toHaveLength(1);
        expect(poem.comments.pageInfo.pageSize).toStrictEqual(poem.comments.edges.length)
        expect(poem.comments.pageInfo.hasNextPage).toBe(true);
        expect(poem.comments.pageInfo.hasPreviousPage).toBe(false);

        for (const commentEdge of poem.comments.edges) {
          expect(commentEdge.node.id).toBeDefined();
        }

        cursor = poem.comments.pageInfo.endCursor;
      }

      const secondResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          commentsLimit: 1,
          commentsCursor: cursor,
        },
      });

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const poem = secondResponse.body.singleResult.data?.poem;
        const errors = secondResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.comments).toBeDefined();
        expect(poem.comments.edges).toHaveLength(1);
        expect(poem.comments.pageInfo.pageSize).toStrictEqual(poem.comments.edges.length)
        expect(poem.comments.pageInfo.hasNextPage).toBe(false);
        expect(poem.comments.pageInfo.hasPreviousPage).toBe(true);

        for (const commentEdge of poem.comments.edges) {
          expect(commentEdge.node.id).toBeDefined();
        }
      }
    }
  });

  test("commentsCount", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.commentsCount).toBeDefined();
        expect(poem.commentsCount).toBe(2);
      }
    }
  });

  test("likes, without pagination", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likes).toBeDefined();
        expect(poem.likes.edges).toHaveLength(1);
        expect(poem.likes.pageInfo.pageSize).toStrictEqual(poem.likes.edges.length)

        for (const likeEdge of poem.likes.edges) {
          expect(likeEdge.node.id).toBeDefined();
        }
      }
    }
  });

  test("likes, with pagination", async () => {
    let cursor = "";
    for (const poem of poems) {
      const initialResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          likesLimit: 2,
        },
      });

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const poem = initialResponse.body.singleResult.data?.poem;
        const errors = initialResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likes).toBeDefined();
        expect(poem.likes.edges).toHaveLength(1);
        expect(poem.likes.pageInfo.pageSize).toStrictEqual(poem.likes.edges.length)
        expect(poem.likes.pageInfo.hasNextPage).toBe(false)
        expect(poem.likes.pageInfo.hasPreviousPage).toBe(false)

        for (const likeEdge of poem.likes.edges) {
          expect(likeEdge.node.id).toBeDefined();
        }

        cursor = poem.likes.pageInfo.endCursor;
      }

      const secondResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          likesLimit: 2,
          likesCursor: cursor,
        },
      });

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const poem = secondResponse.body.singleResult.data?.poem;
        const errors = secondResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likes).toBeDefined();
        expect(poem.likes.edges).toHaveLength(0);
        expect(poem.likes.pageInfo.pageSize).toStrictEqual(poem.likes.edges.length)
        expect(poem.likes.pageInfo.hasNextPage).toBe(false)
        expect(poem.likes.pageInfo.hasPreviousPage).toBe(false)

        for (const likeEdge of poem.likes.edges) {
          expect(likeEdge.node.id).toBeDefined();
        }
      }
    }
  });

  test("likesCount", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likesCount).toBeDefined();
        expect(poem.likesCount).toBe(1);
      }
    }
  });

  test("savedBy, without pagination", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedBy).toBeDefined();
        expect(poem.savedBy.edges).toHaveLength(1);
        expect(poem.savedBy.pageInfo.pageSize).toStrictEqual(poem.savedBy.edges.length)

        for (const savedPoemEdge of poem.savedBy.edges) {
          expect(savedPoemEdge.node.id).toBeDefined();
        }
      }
    }
  });

  test("savedBy, with pagination", async () => {
    let cursor = "";
    for (const poem of poems) {
      const initialResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          savedByLimit: 2,
        },
      });

      expect(initialResponse.body.kind).toStrictEqual("single")

      if (initialResponse.body.kind === "single") {
        const poem = initialResponse.body.singleResult.data?.poem;
        const errors = initialResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedBy).toBeDefined();
        expect(poem.savedBy.edges).toHaveLength(1);
        expect(poem.savedBy.pageInfo.pageSize).toStrictEqual(poem.savedBy.edges.length)
        expect(poem.savedBy.pageInfo.hasNextPage).toBe(false)
        expect(poem.savedBy.pageInfo.hasPreviousPage).toBe(false)

        for (const savedPoemEdge of poem.savedBy.edges) {
          expect(savedPoemEdge.node.id).toBeDefined();
        }

        cursor = poem.savedBy.pageInfo.endCursor;
      }

      const secondResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          savedByLimit: 2,
          savedByCursor: cursor,
        },
      });

      expect(secondResponse.body.kind).toStrictEqual("single")

      if (secondResponse.body.kind === "single") {
        const poem = secondResponse.body.singleResult.data?.poem;
        const errors = secondResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedBy).toBeDefined();
        expect(poem.savedBy.edges).toHaveLength(0);
        expect(poem.savedBy.pageInfo.pageSize).toStrictEqual(poem.savedBy.edges.length)
        expect(poem.savedBy.pageInfo.hasNextPage).toBe(false)
        expect(poem.savedBy.pageInfo.hasPreviousPage).toBe(false)

        for (const savedPoemEdge of poem.savedBy.edges) {
          expect(savedPoemEdge.node.id).toBeDefined();
        }
      }
    }
  });

  test("savedByCount", async () => {
    for (const poem of poems) {
      const response = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
        },
      });

      expect(response.body.kind).toStrictEqual("single")

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedByCount).toBeDefined();
        expect(poem.savedByCount).toBe(1);
      }
    }
  });

  test("likedByCurentUser", async () => {
    const loginResponse = await testServer.executeOperation<LoginMutation>({
      query: LOGIN,
      variables: {
        username: "author1",
        password: "password"
      }
    })

    expect(loginResponse.body.kind).toStrictEqual("single")

    if (loginResponse.body.kind === "single") {
      const login = loginResponse.body.singleResult.data?.login;
      const errors = loginResponse.body.singleResult.errors;

      expect(errors).toBeUndefined();

      // all authors have liked their own poems
      const poemResponse = await testServer.executeOperation<GetPoemsQuery>({
        query: GET_POEMS,
        variables: {
          filter: {
            authorId: login.author.id
          },
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      })

      expect(poemResponse.body.kind).toStrictEqual("single")

      if (poemResponse.body.kind === "single") {
        const poems = poemResponse.body.singleResult.data?.poems;

        poems.edges.forEach((edge) => {
          expect(edge.node.likedByCurrentUser.author.id).toStrictEqual(login.author.id)
        })
      }
    }
  })

  test("savedByCurentUser", async () => {
    const loginResponse = await testServer.executeOperation<LoginMutation>({
      query: LOGIN,
      variables: {
        username: "author1",
        password: "password"
      }
    })

    expect(loginResponse.body.kind).toStrictEqual("single")

    if (loginResponse.body.kind === "single") {
      const login = loginResponse.body.singleResult.data?.login;
      const errors = loginResponse.body.singleResult.errors;

      expect(errors).toBeUndefined();

      // all authors have saved their own poems
      const poemResponse = await testServer.executeOperation<GetPoemsQuery>({
        query: GET_POEMS,
        variables: {
          filter: {
            authorId: login.author.id
          },
        },
        headers: {
          authorization: `Bearer ${login.token}`,
        },
      })

      expect(poemResponse.body.kind).toStrictEqual("single")

      if (poemResponse.body.kind === "single") {
        const poems = poemResponse.body.singleResult.data?.poems;

        poems.edges.forEach((edge) => {
          expect(edge.node.savedByCurrentUser.author.id).toStrictEqual(login.author.id)
        })
      }
    }
  })
});
