import { Resolvers } from "../__generated__/types.js";

export const Comment: Resolvers["Comment"] = {
  poem: ({ poemId }, _, { dataSources }) => {
    return dataSources.poemAPI.getPoem({ id: poemId });
  },

  author: ({ authorId }, _, { dataSources }) => {
    return dataSources.poemAPI.getAuthorById({ id: authorId });
  },
};
