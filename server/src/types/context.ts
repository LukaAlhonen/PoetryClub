import { Request, Response } from "express";
import { MyJwtPayload } from "./auth.js";
import { Services } from "../services/index.js";

export type MyContext = {
  req: Request;
  res: Response;
  user: MyJwtPayload | null;
  services: Services;
};
