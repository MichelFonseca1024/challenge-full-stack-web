import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import FactoryResponse from "../helpers/FactoryResponse";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    FactoryResponse.buildJson(res, 401, {
      auth: false,
      message: "Credenciais inválidas",
    });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    FactoryResponse.buildJson(res, 500, {
      auth: false,
      message: "JWT_SECRET is not defined",
    });
    return;
  }

  jwt.verify(token, secret, (err) => {
    if (err) {
      FactoryResponse.buildJson(res, 401, {
        auth: false,
        message: "Seção expirada, faça login novamente",
      });
      return;
    }

    next();
  });
}

export default verifyToken;
