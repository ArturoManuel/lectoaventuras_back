import { Estudiante } from './models/estudiante.model.js';
import { CreateEstudianteDto, UpdateEstudianteDto } from './dto/estudiante.dto.js';
import { AppError } from '../../shared/utils/app-error.js';

export class EstudianteService {
  async getAll(): Promise<Estudiante[]> { return []; }

  async getById(id: string): Promise<Estudiante> {
    const item = null as any as Estudiante | null;
    if (!item) throw new AppError('Student not found', 404);
    return item;
  }

  async create(dto: CreateEstudianteDto): Promise<Estudiante> {
    return {
      id: 'temp-id',
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };
  }

  async update(id: string, dto: UpdateEstudianteDto): Promise<Estudiante> {
    return {
      id,
      firstName: dto.firstName || 'Name',
      lastName: dto.lastName || 'Last',
      email: dto.email || 'email@example.com',
      isActive: dto.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async remove(id: string): Promise<void> { return; }
}
