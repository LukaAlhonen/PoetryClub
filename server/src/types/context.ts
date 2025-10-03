import { PoemAPI } from "../datasources/poem-api.js";
import { Request, Response } from "express";
import { MyJwtPayload } from "./auth.js";
import { Services } from "../services/index.js";

export type MyContext = {
  req: Request;
  res: Response;
  user: MyJwtPayload | null;
  dataSources: {
    poemAPI: PoemAPI;
  };
  services: Services;
};
