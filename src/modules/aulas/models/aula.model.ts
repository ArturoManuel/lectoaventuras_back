export interface Aula {
  id: string;
  name: string;
  description?: string;
  subject: string;
  grade: string;
  code: string; // Unique classroom code for students to join
  teacherId: string;
  maxStudents?: number;
  currentStudents?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AulaWithTeacher extends Aula {
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface AulaWithStudents extends Aula {
  students: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    enrolledAt: Date;
  }[];
}
