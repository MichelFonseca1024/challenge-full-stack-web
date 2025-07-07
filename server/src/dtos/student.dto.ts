export interface StudentDTO {
  id?: number;
  name: string;
  email: string;
  academicRecord: string;
  cpf: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateStudentDTO {
  name: string;
  email: string;
  academicRecord: string;
  cpf: string;
}

export interface UpdateStudentDTO {
  name?: string;
  email?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalRecords: number;
  };
}
