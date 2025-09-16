import { Request, Response, NextFunction } from 'express';
import { PruebaService } from './prueba.service.js';
import { CreatePruebaDto, UpdatePruebaDto } from './dto/prueba.dto.js';
import { ApiResponse } from '../../shared/interfaces/api-response.interface.js';
import { AppError } from '../../shared/utils/app-error.js';

export class PruebaController {
  private pruebaService = new PruebaService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.pruebaService.getAll();
      const response: ApiResponse = { success: true, data: result };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };

  getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError('Id parameter is required', 400);
      const result = await this.pruebaService.getById(id);
      const response: ApiResponse = { success: true, message: 'Test retrieved', data: result };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreatePruebaDto = req.body;
      const result = await this.pruebaService.create(dto, req.user!.id);
      const response: ApiResponse = { success: true, message: 'Test created', data: result };
      res.status(201).json(response);
    } catch (e) { next(e); }
  };

  update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const dto: UpdatePruebaDto = req.body;
      const { id } = req.params;
      if (!id) throw new AppError('Id parameter is required', 400);
      const result = await this.pruebaService.update(id, dto, req.user!.id);
      const response: ApiResponse = { success: true, message: 'Test updated', data: result };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };

  remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError('Id parameter is required', 400);
      await this.pruebaService.remove(id, req.user!.id);
      const response: ApiResponse = { success: true, message: 'Test deleted' };
      res.status(200).json(response);
    } catch (e) { next(e); }
  };
}

