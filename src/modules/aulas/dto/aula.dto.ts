export interface CreateAulaDto {
  name: string;
  description?: string;
  subject: string;
  grade: string;
  maxStudents?: number;
}

export interface UpdateAulaDto {
  name?: string;
  description?: string;
  subject?: string;
  grade?: string;
  maxStudents?: number;
  isActive?: boolean;
}

export interface AulaQueryDto {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  grade?: string;
  isActive?: boolean;
}

export interface AddStudentDto {
  studentId: string;
}
