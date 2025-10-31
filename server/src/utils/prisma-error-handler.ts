import { GraphQLError } from "graphql";
import { Prisma } from "../../generated/prisma/index.js";

export function handlePrismaError(err: Prisma.PrismaClientKnownRequestError, operation: string) {
  console.error(`${operation} error: ${err}`);

  throw err;
}
