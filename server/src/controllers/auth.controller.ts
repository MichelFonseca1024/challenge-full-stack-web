import express from "express";
import { Request, Response } from "express";

import FactoryResponse from "../helpers/FactoryResponse";
import AuthRepository from "../repositories/auth.repository";
import AuthValidation from "../middlewares/validation/AuthValidation";

const router = express.Router();
const authRepository = new AuthRepository();
const authValidation = new AuthValidation();

router.post(
  "/login",
  authValidation.login,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { token, userData } = await authRepository.login(email, password);

      FactoryResponse.buildJson(res, 200, {
        auth: true,
        user: userData,
        token: token,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      FactoryResponse.buildJson(res, 400, { message });
    }
  },
);

router.post(
  "/refresh-token",
  authValidation.refreshToken,
  async (req: Request, res: Response) => {
    try {
      const { email, name } = req.body;
      const oldToken = req.body.token;

      const { token, userData } = await authRepository.verifyToken(
        oldToken,
        email,
        name,
      );

      FactoryResponse.buildJson(res, 200, {
        auth: true,
        user: userData,
        token: token,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      FactoryResponse.buildJson(res, 401, {
        message,
      });
    }
  },
);

export default router;
