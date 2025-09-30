import { PoemAPI } from "../datasources/poem-api.js";
import { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { MyJwtPayload } from "./auth.js";

export type MyContext = {
  req: Request;
  res: Response;
  user: MyJwtPayload | null;
  dataSources: {
    poemAPI: PoemAPI;
  };
};
