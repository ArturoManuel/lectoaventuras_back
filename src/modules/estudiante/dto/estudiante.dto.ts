export interface CreateEstudianteDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateEstudianteDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
}
