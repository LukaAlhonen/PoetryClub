import { GraphQLError } from "graphql";
import { Prisma } from "../../generated/prisma/index.js";

type UniqueConstraintError = Prisma.PrismaClientKnownRequestError & {
  code: "P2002";
  meta: {
    modelName: string;
    target: string[];
  };
};

const isUniqueConstraintError = (e: unknown): e is UniqueConstraintError => {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError &&
    e.code === "P2002" &&
    !!(e.meta && Array.isArray(e.meta?.target))
  );
};

export const handlePrismaError = ({ err }: { err: unknown }) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      if (isUniqueConstraintError(err)) {
        const target = err.meta.target;
        const modelName = err.meta.modelName;
        throw new GraphQLError(
          `Unique constraint failed on "${modelName}" (${target.join(", ")})`,
          { extensions: { code: "BAD_USER_INPUT" } },
        );
      } else {
        throw new GraphQLError("An unexpected error occured", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }
    } else {
      throw new GraphQLError("An unexpected error occured", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  } else {
    throw new GraphQLError("An unexpected error occured", {
      extensions: { code: "INTERNAL_SERVER_ERROR" },
    });
  }
};
