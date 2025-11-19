import { Resolvers } from "../__generated__/types.js";
import { handlePrismaError } from "../utils/prisma-error-handler.js";

export const Collection: Resolvers["Collection"] = {
  author: async ({ authorId }, _, { services }) => {
    try {
      const author = await services.authorService.getAuthorById({
        id: authorId,
      });
      return author;
    } catch (err) {
      handlePrismaError({err})
    }
  },

  poems: async ({ id }, { first, after }, { services }) => {
    try {
      const poems = await services.poemService.getPoemsConnection({
        first,
        after,
        filter: {
          collectionId: id,
        },
      });
      return poems;
    } catch (err) {
      handlePrismaError({err})
    }
  },
};
