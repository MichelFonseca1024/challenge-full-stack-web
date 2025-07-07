/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response, NextFunction } from "express";
import { object, string, number } from "yup";
import FactoryResponse from "../../helpers/FactoryResponse";

export default class StudentValidation {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const createStudentSchema = object({
        name: string()
          .required("O campo nome é obrigatório")
          .min(3, "Nome deve ter no mínimo 3 caracteres")
          .max(100, "Nome deve ter no máximo 100 caracteres"),
        email: string()
          .required("O campo email é obrigatório")
          .email("Email deve ter um formato válido")
          .max(255, "Email deve ter no máximo 255 caracteres"),
        academicRecord: string()
          .required("O campo RA é obrigatório")
          .min(1, "RA deve ter no mínimo 1 caractere")
          .max(20, "RA deve ter no máximo 20 caracteres"),
        cpf: string()
          .required("O campo CPF é obrigatório")
          .matches(
            /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
            "CPF deve ter um formato válido",
          )
          .max(14, "CPF deve ter no máximo 14 caracteres"),
      });

      await createStudentSchema.validate(req.body, {
        strict: true,
      });

      next();
    } catch (err: any) {
      FactoryResponse.buildJson(res, 400, { message: err.message });
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const updateStudentSchema = object({
        name: string()
          .optional()
          .min(3, "Nome deve ter no mínimo 3 caracteres")
          .max(100, "Nome deve ter no máximo 100 caracteres"),
        email: string()
          .optional()
          .email("Email deve ter um formato válido")
          .max(255, "Email deve ter no máximo 255 caracteres"),
      });

      await updateStudentSchema.validate(req.body, {
        strict: true,
      });

      next();
    } catch (err: any) {
      FactoryResponse.buildJson(res, 400, { message: err.message });
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const findByIdSchema = object({
        id: number()
          .required("O campo ID é obrigatório")
          .positive("ID deve ser um número positivo")
          .integer("ID deve ser um número inteiro")
          .typeError("ID deve ser um número"),
      });

      await findByIdSchema.validate(
        { id: parseInt(req.params.id) },
        { strict: true },
      );

      next();
    } catch (err: any) {
      FactoryResponse.buildJson(res, 400, { message: err.message });
    }
  }

  async pagination(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const paginationSchema = object({
        page: number()
          .optional()
          .default(1)
          .min(1, "A página deve ser no mínimo 1")
          .integer("A página deve ser um número inteiro")
          .typeError("A página deve ser um número"),
        limit: number()
          .optional()
          .default(10)
          .min(1, "O limite deve ser no mínimo 1")
          .max(100, "O limite deve ser no máximo 100")
          .integer("O limite deve ser um número inteiro")
          .typeError("O limite deve ser um número"),
      });

      const validatedQuery = await paginationSchema.validate(
        {
          page: req.query.page ? parseInt(req.query.page as string) : undefined,
          limit: req.query.limit
            ? parseInt(req.query.limit as string)
            : undefined,
        },
        { strict: true },
      );

      req.query.page = validatedQuery.page?.toString() || "1";
      req.query.limit = validatedQuery.limit?.toString() || "10";

      next();
    } catch (err: any) {
      FactoryResponse.buildJson(res, 400, { message: err.message });
    }
  }

  async searchWithPagination(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const searchWithPaginationSchema = object({
        q: string()
          .required("O parâmetro de busca é obrigatório")
          .min(2, "O parâmetro de busca deve ter no mínimo 2 caracteres")
          .max(255, "O parâmetro de busca deve ter no máximo 255 caracteres"),
        page: number()
          .optional()
          .default(1)
          .min(1, "A página deve ser no mínimo 1")
          .integer("A página deve ser um número inteiro")
          .typeError("A página deve ser um número"),
        limit: number()
          .optional()
          .default(10)
          .min(1, "O limite deve ser no mínimo 1")
          .max(100, "O limite deve ser no máximo 100")
          .integer("O limite deve ser um número inteiro")
          .typeError("O limite deve ser um número"),
      });

      const validatedQuery = await searchWithPaginationSchema.validate(
        {
          q: req.query.q,
          page: req.query.page ? parseInt(req.query.page as string) : undefined,
          limit: req.query.limit
            ? parseInt(req.query.limit as string)
            : undefined,
        },
        { strict: true },
      );

      req.query.q = validatedQuery.q;
      req.query.page = validatedQuery.page?.toString() || "1";
      req.query.limit = validatedQuery.limit?.toString() || "10";

      next();
    } catch (err: any) {
      FactoryResponse.buildJson(res, 400, { message: err.message });
    }
  }
}
