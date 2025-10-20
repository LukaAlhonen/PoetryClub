import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";
import { FollowedAuthorWithRelations } from "../../types/extended-types.js";
import { compareAuthorFields, compareFollowedAuthorFields } from "../../utils/tests/compare-fields.js";

const sortFollowedAuthors = ({
  followedAuthors,
}: {
  followedAuthors: FollowedAuthorWithRelations[];
}): FollowedAuthorWithRelations[] => {
  followedAuthors.sort((a, b) => {
    const dateDiff = b.dateFollowed.getTime() - a.dateFollowed.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });

  return followedAuthors;
};


describe("FollowedAuthorService integration tests", () => {
  const cache = new CacheAPI({prefix: "FollowedAuthorService"});
  const services = createServices({ prisma, cache });
  const testId = randomUUID();
  let followedAuthors: FollowedAuthorWithRelations[] = []

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
    followedAuthors = sortFollowedAuthors({followedAuthors: seedResult.followedAuthors})
  });

  test("getFollowedAuthor", async () => {
    for (const followedAuthor of followedAuthors) {
      const result = await services.followedAuthorService.getFollowedAuthor({id: followedAuthor.id})
      expect(result).toBeDefined();
      compareFollowedAuthorFields(result, followedAuthor)
    }
  });

  test("getFollowedAuthors", async () => {
    const result = await services.followedAuthorService.getFollowedAuthors()
    expect(result).toBeDefined()
    expect(result).toHaveLength(followedAuthors.length)
    for (let i = 0; i < result.length; ++i) {
      compareFollowedAuthorFields(result[i], followedAuthors[i])
    }
  })

  test("getFollowedAuthors, with pagination", async () => {
    const result1 = await services.followedAuthorService.getFollowedAuthors({
      first: 10
    })

    expect(result1).toBeDefined();
    expect(result1).toHaveLength(10)
    let i = 0;
    for (; i < result1.length; ++i) {
      compareFollowedAuthorFields(result1[i], followedAuthors[i])
    }

    const result2 = await services.followedAuthorService.getFollowedAuthors({first: 10, after: result1[i-1].id})

    expect(result2).toBeDefined();
    expect(result2).toHaveLength(followedAuthors.length-10)
    for (let j = 0; j < result2.length && i < followedAuthors.length; ++j && ++i) {
      compareFollowedAuthorFields(result2[j], followedAuthors[i])
    }
  })

  test("getFollowedAuthors, with filter", async () => {
    const result = await services.followedAuthorService.getFollowedAuthors({
      followerId: followedAuthors[0].followerId
    })

    expect(result).toHaveLength(3)

    const result2 = await services.followedAuthorService.getFollowedAuthors({
      followingId: followedAuthors[0].followingId
    })

    expect(result).toHaveLength(3)
  })

  test("getFollowedAuthorsConnection", async () => {
    const result = await services.followedAuthorService.getFollowedAuthorsConnection()
    const resultFollowedAuthors = result.edges.map((edge) => edge.node);

    expect(resultFollowedAuthors).toHaveLength(12);

    resultFollowedAuthors.forEach((followedAuthor, i) => {
      compareFollowedAuthorFields(followedAuthor, followedAuthors[i])
    })
  })

  test("getFollowedAuthorsConnection, with pagination", async () => {
    const result1 = await services.followedAuthorService.getFollowedAuthorsConnection({ first: 10 });

    expect(result1.edges).toHaveLength(10);
    expect(result1.pageInfo.hasNextPage).toBe(true);

    let i = 0;
    for (i; i < 10; ++i) {
      compareFollowedAuthorFields(result1.edges[i].node, followedAuthors[i]);
    }

    const result2 = await services.followedAuthorService.getFollowedAuthorsConnection({ first: 10, after: result1.pageInfo.endCursor });

    expect(result2.edges).toHaveLength(2);
    expect(result2.pageInfo.hasNextPage).toBe(false)

    for (let j = 0; j < 2; ++j && ++i) {
      compareFollowedAuthorFields(result2.edges[j].node, followedAuthors[i])
    }
  })

  test("getFollowedAuthorsConnection, with filter", async () => {
    const result1 = await services.followedAuthorService.getFollowedAuthorsConnection({ followerId: followedAuthors[0].followerId });
    expect(result1.edges).toHaveLength(3)

    const result2 = await services.followedAuthorService.getFollowedAuthorsConnection({ followingId: followedAuthors[0].followingId });
    expect(result2.edges).toHaveLength(3)
  })

  test("createFollowedAuthor", async () => {
    // need to create author first since all seeded authors already follow each other
    const author = await services.authorService.createAuthor({username: "pelle kalle", email: "pelle.kalle@domain.com", password: "password"})

    const result = await services.followedAuthorService.createFollowedAuthor({
      authorId: author.id,
      followingId: followedAuthors[0].followerId
    })

    expect(result).toBeDefined();

    // make sure followedAuthor was created
    const followedAuthor = await services.followedAuthorService.getFollowedAuthor({id: result.id})
    compareFollowedAuthorFields(result, followedAuthor)
    await expect(services.followedAuthorService.getFollowedAuthors()).resolves.toHaveLength(13)
  })

  test("createFollowedAuthor, with invalid input", async () => {
    await expect(services.followedAuthorService.createFollowedAuthor({authorId: testId, followingId: ""})).rejects.toThrow()
  })

  test("removeFollowedAuthor", async () => {
    const result = await services.followedAuthorService.removeFollowedAuthor({id: followedAuthors[0].id})
    expect(result).toBeDefined()

    // make sure followedAuthor was removed
    await expect(services.followedAuthorService.getFollowedAuthor({id: result.id})).resolves.toBeNull()
    await expect(services.followedAuthorService.getFollowedAuthors()).resolves.toHaveLength(11)
  })

  test("removeFollowedAuthor, with invalid id", async () => {
    await expect(services.followedAuthorService.removeFollowedAuthor({ id: testId })).rejects.toThrow();

    // make sure no followedAuthor was removed
    await expect(services.followedAuthorService.getFollowedAuthors()).resolves.toHaveLength(12)
  })
});
