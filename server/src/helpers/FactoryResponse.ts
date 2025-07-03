import type { Response } from "express";

const HttpStatus: Record<number, string> = {
  200: "Success",
  201: "Resource created successfully",
  204: "No content",
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Resource not found",
  422: "Unprocessable Entity",
  500: "Internal server error",
  502: "Bad gateway",
  503: "Service unavailable",
  504: "Gateway timeout",
};

export default class FactoryResponse {
  static buildJson(response: Response, code = 200, data = {}): Response {
    return response
      .status(code)
      .json({ code, message: HttpStatus[code], data });
  }
}
