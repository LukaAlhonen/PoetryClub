import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";
export const SavedPoem: Resolvers["SavedPoem"] = {
  author: async ({ authorId }, _, { services }) => {
    try {
      const author = await services.authorService.getAuthorById({
        id: authorId,
      });
      return author;
    } catch (err) {
      handlePrismaError({ err });
    }
  },

  poem: async ({ poemId }, _, { services }) => {
    try {
      const poem = await services.poemService.getPoem({ id: poemId });
      return poem;
    } catch (err) {
      handlePrismaError({ err });
    }
  },
};
