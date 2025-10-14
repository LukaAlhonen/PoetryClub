import { Resolvers } from "../__generated__/types.js";

export const Collection: Resolvers["Collection"] = {
  author: ({ authorId }, _, { services }) => {
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  poems: ({ id }, { limit, cursor }, { services }) => {
    return services.poemService.getPoems({
      first: limit,
      after: cursor,
      filter: {
        collectionId: id,
      },
    });
  },
};
