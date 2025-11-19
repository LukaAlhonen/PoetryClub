import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { SafeAuthor } from "../../types/extended-types.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";
import { compareAuthorFields } from "../../utils/tests/compare-fields.js";
import {
  CreateAuthorInput,
  UpdateAuthorInput,
} from "../../__generated__/types.js";
import argon2 from "argon2";

// Sort authors by dateJoined and id, since seed creates authors so close together
const sortAuthors = ({ authors }: { authors: SafeAuthor[] }): SafeAuthor[] => {
  authors.sort((a, b) => {
    const dateDiff = b.dateJoined.getTime() - a.dateJoined.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });

  return authors;
};

describe("AuthorService integration tests", () => {
  const cache = new CacheAPI({ prefix: "AuthorService" });
  const services = createServices({ prisma, cache });
  let authors: SafeAuthor[] = [];
  const testId = randomUUID();

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
    authors = sortAuthors({ authors: seedResult.authors });
  });

  test("getAuthorById", async () => {
    for (const author of authors) {
      const result = await services.authorService.getAuthorById({
        id: author.id,
        omitAuthVersion: false,
        omitPassword: false,
      });

      expect(result).toBeDefined();
      compareAuthorFields({ author1: result, author2: author });
    }
  });

  test("getAuthorById, invalid id", async () => {
    await expect(
      services.authorService.getAuthorById({ id: testId }),
    ).rejects.toThrow();
  });

  test("getAuthorByUsername", async () => {
    for (const author of authors) {
      const result = await services.authorService.getAuthorByUsername({
        username: author.username,
        omitAuthVersion: false,
        omitPassword: false,
      });

      expect(result).toBeDefined();
      compareAuthorFields({ author1: result, author2: author});
    }
  });

  test("getAuthorByUsername, invalid username", async () => {
    await expect(
      services.authorService.getAuthorByUsername({ username: "kkkkkkkkkk" }),
    ).rejects.toThrow();
  });

  test("getAuthors", async () => {
    const result = await services.authorService.getAuthors({
      omitAuthVersion: false,
      omitPassword: false,
    });
    for (let i = 0; i < result.length; ++i) {
      compareAuthorFields({author1: result[i], author2: authors[i]});
    }
  });

  test("getAuthors, with pagination", async () => {
    const result1 = await services.authorService.getAuthors({
      first: 3,
      omitAuthVersion: false,
      omitPassword: false,
    });
    expect(result1).toHaveLength(3);
    for (let i = 0; i < result1.length; ++i) {
      compareAuthorFields({ author1: result1[i], author2: authors[i] });
    }

    const result2 = await services.authorService.getAuthors({
      first: 3,
      after: result1[result1.length - 1].id,
      omitAuthVersion: false,
      omitPassword: false,
    });

    expect(result2).toHaveLength(1);
    compareAuthorFields({author1: result2[0], author2: authors[authors.length - 1]});
  });

  test("getAuthors, with filter", async () => {
    const result = await services.authorService.getAuthors({
      usernameContains: "1",
      omitAuthVersion: false,
      omitPassword: false,
    });
    expect(result).toHaveLength(1);
    expect(result[0].username).toStrictEqual("author1");
  });

  test("getAuthorsConnection", async () => {
    const result = await services.authorService.getAuthorsConnection();
    const resultAuthors = result.edges.map((edge) => edge.node)

    expect(resultAuthors).toHaveLength(4);

    authors.forEach((author, i) => {
      compareAuthorFields({ author1: resultAuthors[i], author2: author, ignorePassword: true, ignoreAuthVersion: true })
    })
  })

  test("getAuthorsConnection, with pagination", async () => {
    const result1 = await services.authorService.getAuthorsConnection({ first: 3 });
    const resultAuthors1 = result1.edges.map((edge) => edge.node);

    expect(resultAuthors1).toHaveLength(3);

    resultAuthors1.forEach((author, i) => {
      compareAuthorFields({ author1: author, author2: authors[i], ignoreAuthVersion: true, ignorePassword: true});
    })

    const result2 = await services.authorService.getAuthorsConnection({ first: 3, after: result1.pageInfo.endCursor });
    const resultAuthors2 = result2.edges.map((edge) => edge.node);

    expect(resultAuthors2).toHaveLength(1);

    compareAuthorFields({author1: resultAuthors2[0], author2: authors[authors.length - 1], ignoreAuthVersion: true, ignorePassword: true})
  })

  test("getAuthorsConnection, with filter", async () => {
    const result = await services.authorService.getAuthorsConnection({usernameContains: "r1"})

    expect(result.edges).toHaveLength(1);
    expect(result.edges[0].node.username).toStrictEqual("author1")
  })

  test("getFollowedAuthorsCount", async () => {
    const result1 = await services.authorService.getFollowedAuthorsCount({
      followerId: authors[0].id,
    });

    expect(result1).toBe(3);

    const result2 = await services.authorService.getFollowedAuthorsCount({
      followingId: authors[1].id,
    });

    expect(result2).toBe(3);
  });

  test("createAuthor", async () => {
    const input: CreateAuthorInput = {
      username: "kallepelle",
      email: "kalle.pelle@domain.com",
      password: "passwourd124",
    };
    const result = await services.authorService.createAuthor({
      ...input,
      omitPassword: false,
      omitAuthVersion: false,
    });
    const author = await services.authorService.getAuthorById({
      id: result.id,
      omitAuthVersion: false,
      omitPassword: false,
    });

    compareAuthorFields({author1: result, author2: author});
  });

  test("createAuthor, with invalid input", async () => {
    const input: CreateAuthorInput = {
      username: "author1",
      password: "",
      email: "author2@domain.com",
    };

    await expect(services.authorService.createAuthor(input)).rejects.toThrow();
  });

  test("updateAuthor", async () => {
    const input: UpdateAuthorInput = {
      username: "pellekalle",
      password: "mynewpassword",
      email: "john@domain.com",
    };

    const newAuthVersion = randomUUID();

    const result = await services.authorService.updateAuthor({
      authVersion: newAuthVersion,
      authorId: authors[0].id,
      ...input,
      omitAuthVersion: false,
      omitPassword: false,
    });

    const author = await services.authorService.getAuthorById({
      id: authors[0].id,
      omitPassword: false,
      omitAuthVersion: false,
    });
    expect(author.username).toStrictEqual(input.username);
    expect(author.email).toStrictEqual(input.email);
    expect(author.authVersion).toStrictEqual(newAuthVersion);
    assert(argon2.verify(author.password, input.password));
  });

  test("updateAuthor, with invalid input", async () => {
    const input: UpdateAuthorInput = {
      username: "author2",
      email: "",
      password: "",
    };

    await expect(
      services.authorService.updateAuthor({
        authorId: authors[0].id,
        ...input,
      }),
    ).rejects.toThrow();
  });

  test("removeAuthor", async () => {
    await services.authorService.removeAuthor({
      id: authors[0].id,
    });

    // make sure author was deleted
    await expect(
      services.authorService.getAuthorById({ id: authors[0].id }),
    ).rejects.toThrow();
  });

  test("removeAuthor, with invalid id", async () => {
    await expect(
      services.authorService.removeAuthor({ id: testId }),
    ).rejects.toThrow();

    // make sure no author was deleted
    await expect(services.authorService.getAuthors()).resolves.toHaveLength(4);
  });
});
