import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { PrismaClient } from "../generated/prisma";
import { PoemAPI } from "./datasources/poem-api";

const prisma = new PrismaClient();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          poemAPI: new PoemAPI(prisma, cache),
        },
      };
    },
  });

  console.log(`🚀 Server running @ ${url}`);
}

startApolloServer();
