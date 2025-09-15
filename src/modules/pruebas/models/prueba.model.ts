export interface Prueba {
  id: string;
  title: string;
  description?: string;
  aulaId: string;
  createdBy: string; // teacher/admin id
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
