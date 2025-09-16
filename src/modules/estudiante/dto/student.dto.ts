export interface StudentResponseDto {
    uuid: string;
    code_classroom: string;
    name: string;
    name_classroom: string;
    email: string;
    preferredLanguage: string;
    role: string;
    status: boolean;
    coins: number;
    average: number;
  
    address?: string | null;
    age?: number | null;
    gender?: string | null;
    phone?: string | null;
    special_needs?: string | null;
    tutor_name?: string | null;
    nivel_lectura?: string | null;
    feedback_student?: string | null;
  
    createdAt?: string | null;     // ISO 8601
    date_response?: string | null; // ISO 8601
  }


  export interface CreateStudentDto {
    code_classroom: string;
    name: string;
    name_classroom: string;
    email: string;
    preferredLanguage?: string;
    role?: string;
    status?: boolean;
  }
  
  export interface UpdateStudentDto extends Partial<CreateStudentDto> {
    // Campos opcionales
  }