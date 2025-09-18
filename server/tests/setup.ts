import { vi, beforeEach } from "vitest";
import { PrismaClient } from "../generated/prisma/index.js";
import { mockDeep, mockReset } from "vitest-mock-extended";

vi.mock("../libs/prisma", () => {
  const prisma = mockDeep<PrismaClient>();
  beforeEach(() => mockReset(prisma));
  return { default: prisma };
});
