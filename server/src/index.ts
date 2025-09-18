import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { PoemAPI } from "./datasources/poem-api.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "./config.js";

const prisma = new PrismaClient();

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: {
      requestHeaders: ["X-Apollo-Operation-Name", "apollo-require-preflight"],
    },
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      let user: JwtPayload | null = null;

      if (token.startsWith("Bearer ")) {
        const rawToken = token.split(" ")[1];
        try {
          user = jwt.verify(rawToken, config.JWT_SECRET) as JwtPayload;
        } catch (err) {
          console.error("Invalid jwt", err);
        }
      }
      return {
        user,
        dataSources: {
          poemAPI: new PoemAPI(prisma),
        },
      };
    },
  });

  console.log(`🚀 Server running @ ${url}`);
}

startApolloServer();
