import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { LikeWithRelations, SafeAuthor } from "../../types/extended-types.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";
import { compareLikeFields } from "../../utils/tests/compare-fields.js";

const sortLikes = ({
  likes,
}: {
  likes: LikeWithRelations[];
}): LikeWithRelations[] => {
  likes.sort((a, b) => {
    const dateDiff = b.datePublished.getTime() - a.datePublished.getTime();
    if (dateDiff !== 0) return dateDiff;
    return b.id.localeCompare(a.id);
  });

  return likes;
};

describe("LikeService integration tests", () => {
  const cache = new CacheAPI({ prefix: "LikeService" });
  const services = createServices({ prisma, cache });
  const testId = randomUUID();
  let likes: LikeWithRelations[] = [];

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
    likes = sortLikes({likes: seedResult.likes})
  });

  test("getLike", async () => {
    for (const like of likes) {
      const result = await services.likeService.getLike({id: like.id})
      compareLikeFields(result, like)
    }
  });

  test("getLikes", async () => {
    const result = await services.likeService.getLikes()

    expect(result).toBeDefined();
    expect(result).toHaveLength(8)

    for (let i = 0; i < result.length; ++i) {
      compareLikeFields(result[i], likes[i])
    }
  })

  test("getLikes, with pagination", async () => {
    const result1 = await services.likeService.getLikes({first: 5})

    expect(result1).toBeDefined();
    expect(result1).toHaveLength(5);
    let i = 0;
    for (; i < 5; ++i) {
      compareLikeFields(result1[i], likes[i])
    }

    const result2 = await services.likeService.getLikes({first: 5, after: result1[i-1].id})

    expect(result2).toBeDefined()
    expect(result2).toHaveLength(3);
    for (let j = 0; j < 3 && i < 8; ++j && ++i) {
      compareLikeFields(result2[j], likes[i])
    }
  })

  test("getLikes, with filter", async () => {
    await expect(services.likeService.getLikes({poemId: likes[0].poemId})).resolves.toHaveLength(1)
    await expect(services.likeService.getLikes({authorId: likes[0].authorId})).resolves.toHaveLength(2)
  })

  test.todo("getLikesConnection")
  test.todo("getLikesConnection, with pagination")
  test.todo("getLikesConnection, with filter")

  test("createLike", async () => {
    // create new author
    const author = await services.authorService.createAuthor({username: "pelle", email: "pelle@domain.com", password: "password"})

    const result = await services.likeService.createLike({authorId: author.id, poemId: likes[1].poemId})
    expect(result).toBeDefined();

    const like = await services.likeService.getLike({id: result.id})

    expect(result).toStrictEqual(like)
    await expect(services.likeService.getLikes()).resolves.toHaveLength(9)
  })

  test("createLike, with invalid input", async () => {
    await expect(services.likeService.createLike({ authorId: testId, poemId: "" })).rejects.toThrow();
  })

  test("removeLike", async () => {
    const result = await services.likeService.removeLike({id: likes[0].id})
    expect(result).toBeDefined();

    // make sure like was removed
    await expect(services.likeService.getLike({ id: result.id })).resolves.toBeNull();
    await expect(services.likeService.getLikes()).resolves.toHaveLength(7)
  })

  test("removeLike, with invalid id", async () => {
    await expect(services.likeService.removeLike({ id: testId })).rejects.toThrow();
  })
});
