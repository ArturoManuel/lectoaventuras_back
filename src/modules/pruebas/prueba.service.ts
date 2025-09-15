import { Prueba } from './models/prueba.model.js';
import { CreatePruebaDto, UpdatePruebaDto } from './dto/prueba.dto.js';
import { AppError } from '../../shared/utils/app-error.js';

export class PruebaService {
  async getAll(): Promise<Prueba[]> {
    // TODO: DB fetch
    return [];
  }

  async getById(id: string): Promise<Prueba> {
    // TODO: DB fetch
    const prueba = null as any as Prueba | null;
    if (!prueba) throw new AppError('Test not found', 404);
    return prueba;
  }

  async create(dto: CreatePruebaDto, creatorId: string): Promise<Prueba> {
    // TODO: DB create
    const newItem: Prueba = {
      id: 'temp-id',
      title: dto.title,
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      aulaId: dto.aulaId,
      createdBy: creatorId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newItem;
  }

  async update(id: string, dto: UpdatePruebaDto, userId: string): Promise<Prueba> {
    // TODO: DB update with permission check
    return {
      id,
      title: dto.title ?? 't',
      ...(dto.description !== undefined ? { description: dto.description } : {}),
      aulaId: 'a',
      createdBy: userId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async remove(id: string, userId: string): Promise<void> {
    // TODO: DB delete with permission check
    return;
  }
}
