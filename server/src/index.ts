import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.js";
import { PrismaClient } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import config from "./config.js";
import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { MyContext } from "./types/context.js";
import { MyJwtPayload } from "./types/auth.js";
import { CacheAPI } from "./cache/cache-api.js";
import { createServices } from "./services/index.js";

const prisma = new PrismaClient();
const cache = new CacheAPI();

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    schema,
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
    expressMiddleware<MyContext>(server, {
      context: async ({ req, res }) => {
        const token = req.headers.authorization || "";
        let user: MyJwtPayload | null = null;

        if (token.startsWith("Bearer ")) {
          const rawToken = token.split(" ")[1];
          try {
            user = jwt.verify(rawToken, config.JWT_SECRET) as MyJwtPayload;
          } catch (err) {
            console.error("Invalid jwt", err);
          }
        }
        return {
          req,
          res,
          user,
          services: createServices({ prisma, cache }),
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
