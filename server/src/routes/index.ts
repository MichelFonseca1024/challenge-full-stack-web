import { Request, Response, Router } from "express";
import FactoryResponse from "../helpers/FactoryResponse";

import authController from "../controllers/auth.controller";

const router = Router();

router.get("/", (_request: Request, response: Response) => {
  FactoryResponse.buildJson(response, 200, { message: "App Online!" });
});

router.use("/auth", authController);

router.all("*", (_request: Request, response: Response) => {
  FactoryResponse.buildJson(response, 404, { message: "rota não encontrada" });
});

export default router;
