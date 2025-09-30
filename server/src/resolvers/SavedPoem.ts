import { Resolvers } from "../__generated__/types.js";
export const SavedPoem: Resolvers["SavedPoem"] = {
  author: ({ authorId }, _, { dataSources }) => {
    return dataSources.poemAPI.getAuthorById({
      id: authorId,
    });
  },

  poem: ({ poemId }, _, { dataSources }) => {
    return dataSources.poemAPI.getPoem({ id: poemId });
  },
};
