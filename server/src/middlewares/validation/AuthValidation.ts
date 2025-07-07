/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response, NextFunction } from "express";
import { object, string } from "yup";
import FactoryResponse from "../../helpers/FactoryResponse";

export default class AuthValidation {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginSchema = object({
        email: string()
          .required("O campo email é obrigatório")
          .email("Email deve ter um formato válido")
          .max(255, "Email deve ter no máximo 255 caracteres"),
        password: string()
          .required("O campo password é obrigatório")
          .min(6, "Password deve ter no mínimo 6 caracteres")
          .max(100, "Password deve ter no máximo 100 caracteres"),
      });

      await loginSchema.validate(req.body, { strict: true });

      next();
    } catch (err: any) {
      FactoryResponse.buildJson(res, 400, { message: err.message });
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshTokenSchema = object({
        token: string()
          .required("O campo token é obrigatório")
          .min(10, "Token deve ter no mínimo 10 caracteres"),
        email: string()
          .required("O campo email é obrigatório")
          .email("Email deve ter um formato válido")
          .max(255, "Email deve ter no máximo 255 caracteres"),
        name: string()
          .required("O campo name é obrigatório")
          .min(2, "Nome deve ter no mínimo 2 caracteres")
          .max(100, "Nome deve ter no máximo 100 caracteres"),
      });

      await refreshTokenSchema.validate(req.body, {
        strict: true,
      });

      next();
    } catch (err: any) {
      FactoryResponse.buildJson(res, 400, { message: err.message });
    }
  }
}
