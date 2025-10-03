import { Resolvers } from "../__generated__/types.js";

export const Comment: Resolvers["Comment"] = {
  poem: ({ poemId }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getPoem({ id: poemId });
    return services.poemService.getPoem({ id: poemId });
  },

  author: ({ authorId }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getAuthorById({ id: authorId });
    return services.authorService.getAuthorById({ id: authorId });
  },
};
