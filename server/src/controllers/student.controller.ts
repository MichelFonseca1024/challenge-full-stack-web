import express from "express";
import { Request, Response } from "express";

import FactoryResponse from "../helpers/FactoryResponse";
import StudentRepository from "../repositories/student.repository";
import StudentValidation from "../middlewares/validation/StudentValidation";
import { PaginationParams } from "../dtos/student.dto";

const router = express.Router();
const studentRepository = new StudentRepository();
const studentValidation = new StudentValidation();

const getPaginationParams = (req: Request): PaginationParams => {
  const page = parseInt(req.query.page as string);
  const limit = parseInt(req.query.limit as string);
  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

router.post(
  "/",
  studentValidation.create,
  async (req: Request, res: Response) => {
    try {
      const { name, email, academicRecord, cpf } = req.body;

      const student = await studentRepository.create({
        name,
        email,
        academicRecord,
        cpf,
      });

      FactoryResponse.buildJson(res, 201, {
        message: "Estudante criado com sucesso",
        student,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      FactoryResponse.buildJson(res, 400, { message });
    }
  },
);

router.get(
  "/",
  studentValidation.pagination,
  async (req: Request, res: Response) => {
    try {
      const paginationParams = getPaginationParams(req);
      const query = req.query.q as string;

      let result;
      if (query) {
        result = await studentRepository.search(query, paginationParams);
      } else {
        result = await studentRepository.findAllPaginated(paginationParams);
      }

      FactoryResponse.buildJson(res, 200, {
        message: "Estudantes listados com sucesso",
        students: result.data,
        pagination: result.pagination,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      FactoryResponse.buildJson(res, 400, { message });
    }
  },
);

router.get(
  "/:id",
  studentValidation.findById,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const student = await studentRepository.findById(id);

      if (!student) {
        FactoryResponse.buildJson(res, 200, {
          message: "Nenhum estudante encontrado",
        });
        return;
      }

      FactoryResponse.buildJson(res, 200, {
        message: "Estudante encontrado com sucesso",
        student,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      FactoryResponse.buildJson(res, 400, { message });
    }
  },
);

router.put(
  "/:id",
  studentValidation.findById,
  studentValidation.update,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { name, email } = req.body;

      const updatedStudent = await studentRepository.update(id, {
        name,
        email,
      });

      FactoryResponse.buildJson(res, 200, {
        message: "Estudante atualizado com sucesso",
        student: updatedStudent,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      FactoryResponse.buildJson(res, 400, { message });
    }
  },
);

router.delete(
  "/:id",
  studentValidation.findById,
  async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      await studentRepository.delete(id);

      FactoryResponse.buildJson(res, 200, {
        message: "Estudante excluído com sucesso",
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";
      FactoryResponse.buildJson(res, 400, { message });
    }
  },
);

export default router;
