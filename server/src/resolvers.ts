import { Resolvers } from "./types";
import { DateScalar } from "./scalars/date-scalar";
import { handlePrismaError } from "./utils/prisma-error-handler";

export const resolvers: Resolvers = {
  Date: DateScalar,
  Query: {
    poem: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getPoem(id);
    },

    poems: (_, { authorId }, { dataSources }) => {
      return dataSources.poemAPI.getPoems(authorId);
    },

    user: (_, { id }, { dataSources }) => {
      return dataSources.poemAPI.getUser(id);
    },

    users: (_, __, { dataSources }) => {
      return dataSources.poemAPI.getUsers();
    },

    userByName: (_, { username }, { dataSources }) => {
      return dataSources.poemAPI.getUserByName(username);
    },
  },

  Mutation: {
    createPoem: (_, { input }, { dataSources }) => {
      return dataSources.poemAPI.createPoem(input);
    },

    createUser: (_, { input }, { dataSources }) => {
      return dataSources.poemAPI.createUser(input);
    },

    updatePoem: (_, { input }, { dataSources }) => {
      return dataSources.poemAPI.updatePoem(input);
    },

    updateUser: (_, { input }, { dataSources }) => {
      return dataSources.poemAPI.updateUser(input);
    },
  },

  Poem: {
    author: ({ authorId }, _, { dataSources }) => {
      return dataSources.poemAPI.getUser(authorId);
    },
  },
};
