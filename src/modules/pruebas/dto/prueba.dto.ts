export interface CreatePruebaDto {
  title: string;
  description?: string;
  aulaId: string;
}

export interface UpdatePruebaDto {
  title?: string;
  description?: string;
  isActive?: boolean;
}
