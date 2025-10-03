import { Prisma } from "../../generated/prisma/index.js";

export function handlePrismaError(err: unknown, operation: string) {
  console.error(`${operation} error: ${err}`);

  throw err;
}
