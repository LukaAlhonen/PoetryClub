import { Prisma } from "../../generated/prisma";

export function handlePrismaError(err: unknown, operation: string) {
  console.error(`${operation} error: ${err}`);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const errMap: Record<string, { code: number; message: string }> = {
      P2002: { code: 409, message: "Unique constraint violation" },
      P2003: { code: 400, message: "Foreign key constraint violation" },
      P2025: { code: 404, message: "Record not found" },
    };

    const errInfo = errMap[err.code] || {
      code: 400,
      message: `DB error: ${err.message}`,
    };

    return {
      code: errInfo.code,
      success: false,
      message: errInfo.message,
      data: null,
    };
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    return {
      code: 400,
      success: false,
      message: "Invalid data provided",
      data: null,
    };
  } else {
    return {
      code: 500,
      success: false,
      message: "An unexpected error occured",
      data: null,
    };
  }
}
