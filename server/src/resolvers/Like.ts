import { Resolvers } from "../__generated__/types.js";

export const Like: Resolvers["Like"] = {
  author: ({ authorId }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getAuthorById({
    //   id: authorId,
    // });
    return services.authorService.getAuthorById({
      id: authorId,
    });
  },

  poem: ({ poemId }, _, { dataSources, services }) => {
    // return dataSources.poemAPI.getPoem({ id: poemId });
    return services.poemService.getPoem({ id: poemId });
  },
};
