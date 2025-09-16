import { Request, Response, NextFunction } from 'express';
import { EstudianteService } from './estudiante.service.js';
import { CreateEstudianteDto, UpdateEstudianteDto } from './dto/estudiante.dto.js';
import { ApiResponse } from '../../shared/interfaces/api-response.interface.js';
import { AppError } from '../../shared/utils/app-error.js';

export class EstudianteController {
  private service = new EstudianteService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const aulasParam = (req.query.aulas as string | undefined) || '';
      const nameParam = (req.query.name as string | undefined) || '';
      const codes = aulasParam
        ? aulasParam.split(',').map((c) => c.trim()).filter(Boolean)
        : [];

      const data = (codes.length || nameParam)
        ? await this.service.search({ name: nameParam, classrooms: codes })
        : await this.service.getAll();
      const response: ApiResponse = { success: true, message: 'Students retrieved', data };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };

  getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError('Param "id" is required', 400);
      const data = await this.service.getById(id);
      const response: ApiResponse = { success: true, message: 'Student retrieved', data };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateEstudianteDto = req.body;
      const data = await this.service.create(dto);
      const response: ApiResponse = { success: true, message: 'Student created', data };
      res.status(201).json(response);
    } catch (e) { next(e); }
  };

  update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const dto: UpdateEstudianteDto = req.body;
      const { id } = req.params;
      if (!id) throw new AppError('Param "id" is required', 400);
      const data = await this.service.update(id, dto);
      const response: ApiResponse = { success: true, message: 'Student updated', data };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };

  remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError('Param "id" is required', 400);
      await this.service.remove(id);
      const response: ApiResponse = { success: true, message: 'Student deleted' };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };
}
