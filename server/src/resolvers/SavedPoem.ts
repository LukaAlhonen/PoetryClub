import { Resolvers } from "../__generated__/types.js";
export const SavedPoem: Resolvers["SavedPoem"] = {
  author: ({ authorId }, _, { dataSources, services }) => {
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  poem: ({ poemId }, _, { dataSources, services }) => {
    return services.poemService.getPoem({ id: poemId });
  },
};
