import { GraphQLError } from "graphql";
import { Prisma } from "../../generated/prisma/index.js";

type PrismaError =
  Prisma.PrismaClientInitializationError |
  Prisma.PrismaClientKnownRequestError |
  Prisma.PrismaClientRustPanicError |
  Prisma.PrismaClientUnknownRequestError |
  Prisma.PrismaClientValidationError

type UniqueConstraintError = Prisma.PrismaClientKnownRequestError & {
  code: "P2002";
  meta: {
    modelName: string;
    target: string[];
  };
};

type RecordNotFoundError = Prisma.PrismaClientKnownRequestError & {
  meta: {
    modelName: string,
    cause: string
  }
}

const isUniqueConstraintError = (e: PrismaError): e is UniqueConstraintError => {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError &&
    e.code === "P2002" &&
    !!(e.meta && Array.isArray(e.meta?.target))
  );
};

export const handlePrismaError = ({ err }: { err: PrismaError | GraphQLError }) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      if (isUniqueConstraintError(err)) {
        const target = err.meta.target;
        const modelName = err.meta.modelName;
        throw new GraphQLError(
          `${modelName} with ${target.join(", ")} already exists`,
          { extensions: { code: "BAD_USER_INPUT" } },
        );
      } else {
        throw new GraphQLError("An unexpected error occured", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    } else if (err.code === "P2025") {
      const modelName = (err as RecordNotFoundError).meta.modelName;
      throw new GraphQLError(`${modelName} does not exist`, { extensions: { code: "BAD_USER_INPUT" } })
    } else if (err.code === "P2023") {
      const modelName = (err as RecordNotFoundError).meta.modelName;
      throw new GraphQLError(`${modelName} does not exist`, { extensions: { code: "BAD_USER_INPUT" } })
    } else {
      console.log(err)
      throw new GraphQLError("An unexpected error occured", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  } else if (err instanceof GraphQLError) {
    throw err;
  } else {
    throw new GraphQLError("An unexpected error occured", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
  }
};
