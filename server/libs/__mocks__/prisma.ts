import { PrismaClient } from "../../generated/prisma/index.js";
import { beforeEach } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";

beforeEach(() => {
  mockReset(prisma);
});

export type PrismaMock = DeepMockProxy<PrismaClient>;
const prisma = mockDeep<PrismaClient>() as PrismaMock;
export default prisma;
