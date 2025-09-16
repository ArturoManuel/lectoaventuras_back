export interface Student {
    uuid: string;
    code_classroom: string;
    name: string;
    name_classroom: string;
    email: string;
    preferredLanguage: 'es' | 'en' | string;
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

    createdAt?: Date | null;
    date_response?: Date | null;
  }