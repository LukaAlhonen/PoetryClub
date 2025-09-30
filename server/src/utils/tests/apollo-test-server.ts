import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../../schema.js";
import { resolvers } from "../../resolvers/index.js";
import { PoemAPI } from "../../datasources/poem-api.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { MyContext } from "../../types/context.js";
import config from "../../config.js";
import { GraphQLResponse } from "@apollo/server";
import { DocumentNode } from "graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { MyJwtPayload } from "../../types/auth.js";
import { Request, Response } from "express";

export interface TestServer {
  server: ApolloServer<MyContext>;
  executeOperation<TData = any, TVariables = Record<string, any>>(
    options: ExecuteOperationOptions<TData, TVariables>,
  ): Promise<GraphQLResponse<TData>>;

  cleanup(): Promise<void>;
}

export interface ExecuteOperationOptions<TData, TVariables> {
  query: DocumentNode | TypedDocumentNode<TData, TVariables>;
  variables?: Record<string, any>;
  operationName?: string;
  contextValue?: Partial<MyContext>;
  headers?: Record<string, string>;
}

export interface ExecuteOperationResult<TData = any> {
  body: {
    kind: "single";
    singleResult: {
      data?: TData;
      errors?: Array<{
        message: string;
        locations?: Array<{ line: number; column: number }>;
        path?: Array<string | number>;
        extensions?: Record<string, any>;
      }>;
      extensions?: Record<string, any>;
    };
  };
}

export async function createTestServer({
  poemAPI,
}: {
  poemAPI: PoemAPI;
}): Promise<TestServer> {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  return {
    server,

    async executeOperation<TData = any, TVariables = Record<string, any>>({
      query,
      variables,
      operationName = undefined,
      contextValue = undefined,
      headers = {},
    }: {
      query: DocumentNode | TypedDocumentNode<TData, TVariables>;
      variables?: TVariables;
      operationName?: string;
      contextValue?: Partial<MyContext>;
      headers?: Record<string, string>;
    }) {
      const token = headers["authorization"];
      let user: JwtPayload | null = null;

      if (token) {
        if (token.startsWith("Bearer ")) {
          const rawToken = token.split(" ")[1];
          try {
            user = jwt.verify(rawToken, config.JWT_SECRET) as MyJwtPayload;
          } catch (err) {
            console.error("Invalid jwt", err);
          }
        }
      }

      const mockReq = {} as Request;
      const mockRes = {
        cookie: vi.fn(),
      } as unknown as Response;

      // const context = contextValue || { user, dataSources: { poemAPI } };
      const context: MyContext =
        (contextValue as MyContext) ??
        ({
          req: mockReq,
          res: mockRes,
          user,
          dataSources: { poemAPI },
        } as MyContext);

      return server.executeOperation<TData>(
        {
          query,
          variables,
          operationName,
        },
        {
          contextValue: context,
        },
      );
    },

    async cleanup() {
      await server.stop();
    },
  };
}
