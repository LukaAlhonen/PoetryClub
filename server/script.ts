import { Prisma } from "./generated/prisma/index.js";
import prisma from "./libs/prisma.js";

export const createUser = async (user: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: user,
    include: {
      poems: true,
      savedPoems: true,
      collections: true,
      comments: true,
      likedPoems: true,
    },
  });
};
