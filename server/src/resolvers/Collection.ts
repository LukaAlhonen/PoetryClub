import { Resolvers } from "../__generated__/types.js";

export const Collection: Resolvers["Collection"] = {
  author: ({ authorId }, _, { services }) => {
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  poems: ({ id }, { first, after }, { services }) => {
    return services.poemService.getPoemsConnection({
      first,
      after,
      filter: {
        collectionId: id,
      },
    });
  },
};
