import { Resolvers } from "../__generated__/types.js";

export const Collection: Resolvers["Collection"] = {
  author: ({ authorId }, _, { dataSources }) => {
    return dataSources.poemAPI.getAuthorById({
      id: authorId,
    });
  },

  poems: ({ id }, { limit, cursor }, { dataSources }) => {
    return dataSources.poemAPI.getPoems({
      limit,
      cursor,
      filter: {
        collectionId: id,
      },
    });
  },
};
