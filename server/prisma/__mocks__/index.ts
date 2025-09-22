import { PrismaClient } from "../../generated/prisma/index.js";
import { v4 } from "uuid";
import config from "../../src/config.js";
import { execSync } from "child_process";
import { beforeEach, afterEach } from "vitest";
import { URL } from "url";

const generateDatabaseURL = (schema: string) => {
  const url = new URL(config.DATABASE_URL);
  url.searchParams.append("schema", schema);
  return url.toString();
};

const schemaId = `test-${v4()}`;

const url = generateDatabaseURL(schemaId);
process.env.DATABASE_URL = url;
export const prisma = new PrismaClient({
  datasources: { db: { url } },
});

beforeEach(async () => {
  execSync("npx prisma db push", {
    env: {
      ...process.env,
    },
  });
});

afterEach(async () => {
  try {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`,
    );
  } finally {
    await prisma.$disconnect();
  }
});
