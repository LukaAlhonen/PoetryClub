import { PrismaClient } from "../../generated/prisma/index.js";
import { v4 } from "uuid";
import config from "../../src/config.js";
import { execSync } from "child_process";
import { beforeEach, afterEach } from "vitest";
import { URL } from "url";

const generateDatabaseURL = (schema: string) => {
  const url = new URL(config.TEST_DATABASE_URL);
  url.searchParams.append("schema", schema);
  return url.toString();
};

const clearDB = async (prisma: PrismaClient) => {
  await prisma.$executeRawUnsafe(`
      DO $$ DECLARE
          r RECORD;
      BEGIN
          FOR r IN (
              SELECT tablename
              FROM pg_tables
              WHERE schemaname = current_schema()
          ) LOOP
              EXECUTE 'TRUNCATE TABLE "' || r.tablename || '" RESTART IDENTITY CASCADE;';
          END LOOP;
      END $$;
    `);
};

const schemaId = `test-${v4()}`;

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
export const prisma = new PrismaClient({
  datasources: { db: { url } },
});

beforeAll(async () => {
  execSync("npx prisma db push", {
    env: {
      ...process.env,
    },
    stdio: "ignore",
  });
});

afterEach(async () => {
  await clearDB(prisma);
});

// beforeEach(async () => {
//   await clearDB(prisma);
// });

afterAll(async () => {
  try {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`,
    );
  } finally {
    await prisma.$disconnect();
  }
});
