import { prisma } from "../../../prisma/index.js";
import { CacheAPI } from "../../cache/cache-api.js";
import { seed } from "../../utils/tests/seed-test-db.js";
import { SafeAuthor } from "../../types/extended-types.js";
import { randomUUID } from "node:crypto";
import { createServices } from "../index.js";

describe("AuthorService integration tests", () => {
  const cache = new CacheAPI();
  const services = createServices({ prisma, cache });
  const testId = randomUUID();

  beforeEach(async () => {
    await cache.delByPattern({ pattern: "*" });
    const seedResult = await seed({ prisma });
  });

  test.todo("getSavedPoem");
});
