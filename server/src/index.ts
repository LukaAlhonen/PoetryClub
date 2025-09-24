import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { PoemAPI } from "./datasources/poem-api.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "./config.js";
import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { MyContext } from "./context.js";

const prisma = new PrismaClient();

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    csrfPrevention: {
      requestHeaders: ["X-Apollo-Operation-Name", "apollo-require-preflight"],
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const corsOptions: cors.CorsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    expressMiddleware(server, {
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
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.APOLLO_SERVER_PORT }, resolve),
  );

  console.log(`🚀 Server running @ localhost:${config.APOLLO_SERVER_PORT}`);
}

startApolloServer();
