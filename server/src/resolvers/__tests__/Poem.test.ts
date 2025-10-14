import { createTestServer } from "../../utils/tests/apollo-test-server.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { prisma } from "../../../prisma/index.js";
import { GetPoemQuery, GetPoemsQuery } from "../../__generated__/graphql.js";

import { GET_POEM, GET_POEMS } from "../../__tests__/queries/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { createServices } from "../../services/index.js";
import { PoemWithRelations } from "../../types/extended-types.js";

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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.author).toBeDefined();
        expect(poem.author.id).toBeDefined();
        // @ts-ignore
        expect(poem.author.password).toBeUndefined();
      } else {
        throw new Error("invalid response kind");
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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.inCollection).toBeDefined();
      } else {
        throw new Error("invalid response kind");
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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.comments).toBeDefined();
        expect(poem.comments).toHaveLength(2);

        for (const comment of poem.comments) {
          expect(comment.id).toBeDefined();
        }
      } else {
        throw new Error("invalid response kind");
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

      if (initialResponse.body.kind === "single") {
        const poem = initialResponse.body.singleResult.data?.poem;
        const errors = initialResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.comments).toBeDefined();
        expect(poem.comments).toHaveLength(1);

        for (const comment of poem.comments) {
          expect(comment.id).toBeDefined();
        }

        cursor = poem.comments[poem.comments.length - 1].id;
      } else {
        throw new Error("invalid response kind");
      }

      const secondResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          commentsLimit: 1,
          commentsCursor: cursor,
        },
      });

      if (secondResponse.body.kind === "single") {
        const poem = secondResponse.body.singleResult.data?.poem;
        const errors = secondResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.comments).toBeDefined();
        expect(poem.comments).toHaveLength(1);

        for (const comment of poem.comments) {
          expect(comment.id).toBeDefined();
        }
      } else {
        throw new Error("invalid response kind");
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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.commentsCount).toBeDefined();
        expect(poem.commentsCount).toBe(2);
      } else {
        throw new Error("invalid response kind");
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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likes).toBeDefined();
        expect(poem.likes).toHaveLength(1);

        for (const like of poem.likes) {
          expect(like.id).toBeDefined();
        }
      } else {
        throw new Error("invalid response kind");
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

      if (initialResponse.body.kind === "single") {
        const poem = initialResponse.body.singleResult.data?.poem;
        const errors = initialResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likes).toBeDefined();
        expect(poem.likes).toHaveLength(1);

        for (const like of poem.likes) {
          expect(like.id).toBeDefined();
        }

        cursor = poem.likes[poem.likes.length - 1].id;
      } else {
        throw new Error("invalid response kind");
      }

      const secondResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          likesLimit: 2,
          likesCursor: cursor,
        },
      });

      if (secondResponse.body.kind === "single") {
        const poem = secondResponse.body.singleResult.data?.poem;
        const errors = secondResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likes).toBeDefined();
        expect(poem.likes).toHaveLength(0);

        for (const like of poem.likes) {
          expect(like.id).toBeDefined();
        }
      } else {
        throw new Error("invalid response kind");
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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.likesCount).toBeDefined();
        expect(poem.likesCount).toBe(1);
      } else {
        throw new Error("invalid response kind");
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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedBy).toBeDefined();
        expect(poem.savedBy).toHaveLength(1);

        for (const savedPoem of poem.savedBy) {
          expect(savedPoem.id).toBeDefined();
        }
      } else {
        throw new Error("invalid response kind");
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

      if (initialResponse.body.kind === "single") {
        const poem = initialResponse.body.singleResult.data?.poem;
        const errors = initialResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedBy).toBeDefined();
        expect(poem.savedBy).toHaveLength(1);

        for (const savedPoem of poem.savedBy) {
          expect(savedPoem.id).toBeDefined();
        }

        cursor = poem.savedBy[poem.savedBy.length - 1].id;
      } else {
        throw new Error("invalid response kind");
      }

      const secondResponse = await testServer.executeOperation<GetPoemQuery>({
        query: GET_POEM,
        variables: {
          id: poem.id,
          savedByLimit: 2,
          savedByCursor: cursor,
        },
      });

      if (secondResponse.body.kind === "single") {
        const poem = secondResponse.body.singleResult.data?.poem;
        const errors = secondResponse.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedBy).toBeDefined();
        expect(poem.savedBy).toHaveLength(0);

        for (const savedPoem of poem.savedBy) {
          expect(savedPoem.id).toBeDefined();
        }
      } else {
        throw new Error("invalid response kind");
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

      if (response.body.kind === "single") {
        const poem = response.body.singleResult.data?.poem;
        const errors = response.body.singleResult.errors;

        if (errors) console.error(errors);

        expect(poem.savedByCount).toBeDefined();
        expect(poem.savedByCount).toBe(1);
      } else {
        throw new Error("invalid response kind");
      }
    }
  });
});
