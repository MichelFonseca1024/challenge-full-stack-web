import { PrismaClient } from "@prisma/client";
import {
  StudentDTO,
  CreateStudentDTO,
  UpdateStudentDTO,
  PaginationParams,
  PaginatedResponse,
} from "../dtos/student.dto";

class StudentRepository {
  private prisma;
  private student;

  constructor() {
    this.prisma = new PrismaClient();
    this.student = this.prisma.student;
  }

  async create(studentData: CreateStudentDTO): Promise<StudentDTO> {
    try {
      const existingByEmail = await this.student.findUnique({
        where: { email: studentData.email },
      });

      if (existingByEmail) {
        throw new Error("Já existe um estudante com este email");
      }

      const existingByRA = await this.student.findUnique({
        where: { academicRecord: studentData.academicRecord },
      });

      if (existingByRA) {
        throw new Error("Já existe um estudante com este RA");
      }

      const existingByCPF = await this.student.findUnique({
        where: { cpf: studentData.cpf },
      });

      if (existingByCPF) {
        throw new Error("Já existe um estudante com este CPF");
      }

      const student = await this.student.create({
        data: studentData,
      });

      return student;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao criar estudante");
    }
  }

  async findAll(): Promise<StudentDTO[]> {
    try {
      const students = await this.student.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return students;
    } catch {
      throw new Error("Erro ao buscar estudantes");
    }
  }

  async findAllPaginated(
    paginationParams: PaginationParams,
  ): Promise<PaginatedResponse<StudentDTO>> {
    try {
      const { page, limit, offset } = paginationParams;

      const [students, totalRecords] = await Promise.all([
        this.student.findMany({
          skip: offset,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.student.count(),
      ]);

      return {
        data: students,
        pagination: {
          currentPage: page,
          totalRecords,
        },
      };
    } catch {
      throw new Error("Erro ao buscar estudantes");
    }
  }

  async findById(id: number): Promise<StudentDTO | null> {
    try {
      const student = await this.student.findUnique({
        where: { id },
      });

      return student;
    } catch {
      throw new Error("Erro ao buscar estudante");
    }
  }

  async search(
    searchTerm: string,
    paginationParams: PaginationParams,
  ): Promise<PaginatedResponse<StudentDTO>> {
    try {
      const { page, limit, offset } = paginationParams;

      const searchCondition = {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
          {
            academicRecord: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
          {
            cpf: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          },
        ],
      };

      const [students, totalRecords] = await Promise.all([
        this.student.findMany({
          where: searchCondition,
          skip: offset,
          take: limit,
          orderBy: {
            createdAt: "desc",
          },
        }),
        this.student.count({
          where: searchCondition,
        }),
      ]);

      return {
        data: students,
        pagination: {
          currentPage: page,
          totalRecords,
        },
      };
    } catch {
      throw new Error("Erro ao buscar estudantes");
    }
  }

  async update(id: number, updateData: UpdateStudentDTO): Promise<StudentDTO> {
    try {
      const existingStudent = await this.student.findUnique({
        where: { id },
      });

      if (!existingStudent) {
        throw new Error("Estudante não encontrado");
      }

      if (updateData.email) {
        const existingByEmail = await this.student.findFirst({
          where: {
            email: updateData.email,
            NOT: { id },
          },
        });

        if (existingByEmail) {
          throw new Error("Já existe um estudante com este email");
        }
      }

      const updatedStudent = await this.student.update({
        where: { id },
        data: updateData,
      });

      return updatedStudent;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao atualizar estudante");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const existingStudent = await this.student.findUnique({
        where: { id },
      });

      if (!existingStudent) {
        throw new Error("Estudante não encontrado");
      }

      await this.student.delete({
        where: { id },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Erro ao deletar estudante");
    }
  }
}

export default StudentRepository;
