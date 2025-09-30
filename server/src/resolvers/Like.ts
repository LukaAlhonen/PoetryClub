import { Resolvers } from "../__generated__/types.js";

export const Like: Resolvers["Like"] = {
  author: ({ authorId }, _, { dataSources }) => {
    return dataSources.poemAPI.getAuthorById({
      id: authorId,
    });
  },

  poem: ({ poemId }, _, { dataSources }) => {
    return dataSources.poemAPI.getPoem({ id: poemId });
  },
};
