import { Request, Response, NextFunction } from 'express';
import { AulaService } from './aula.service.js';
import { CreateAulaDto, UpdateAulaDto } from './dto/aula.dto.js';
import { ApiResponse } from '../../shared/interfaces/api-response.interface.js';
import { logger } from '../../shared/utils/logger.js';
import { AppError } from '../../shared/utils/app-error.js';

export class AulaController {
  private aulaService: AulaService;

  constructor() {
    this.aulaService = new AulaService();
  }

  /**
   * Get all classrooms
   */
  getAllAulas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const result = await this.aulaService.getAllAulas({
        page: Number(page),
        limit: Number(limit),
        search: search as string
      });

      const response: ApiResponse = {
        success: true,
        message: 'Classrooms retrieved successfully',
        data: result
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get classroom by ID
   */
  getAulaById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError('Param "id" is required', 400);
      const result = await this.aulaService.getAulaById(id);

      const response: ApiResponse = {
        success: true,
        message: 'Classroom retrieved successfully',
        data: result
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create new classroom
   */
  createAula = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const aulaData: CreateAulaDto = req.body;
      const teacherId = req.user?.id; // Assuming teacher creates the classroom
      if (!teacherId) throw new AppError('Authentication required', 401);
      
      const result = await this.aulaService.createAula({
        ...aulaData,
        teacherId
      });

      const response: ApiResponse = {
        success: true,
        message: 'Classroom created successfully',
        data: result
      };

      res.status(201).json(response);
      logger.info(`New classroom created: ${result.name} by teacher ${teacherId}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update classroom
   */
  updateAula = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData: UpdateAulaDto = req.body;
      const teacherId = req.user?.id;
      if (!id) throw new AppError('Param "id" is required', 400);
      if (!teacherId) throw new AppError('Authentication required', 401);

      const result = await this.aulaService.updateAula(id, updateData, teacherId);

      const response: ApiResponse = {
        success: true,
        message: 'Classroom updated successfully',
        data: result
      };

      res.status(200).json(response);
      logger.info(`Classroom updated: ${id} by teacher ${teacherId}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete classroom
   */
  deleteAula = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const teacherId = req.user?.id;
      if (!id) throw new AppError('Param "id" is required', 400);
      if (!teacherId) throw new AppError('Authentication required', 401);

      await this.aulaService.deleteAula(id, teacherId);

      const response: ApiResponse = {
        success: true,
        message: 'Classroom deleted successfully'
      };

      res.status(200).json(response);
      logger.info(`Classroom deleted: ${id} by teacher ${teacherId}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Add student to classroom
   */
  addStudentToAula = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { studentId } = req.body as { studentId?: string };
      const teacherId = req.user?.id;
      if (!id) throw new AppError('Param "id" is required', 400);
      if (!studentId) throw new AppError('Field "studentId" is required', 400);
      if (!teacherId) throw new AppError('Authentication required', 401);

      const result = await this.aulaService.addStudentToAula(id, studentId, teacherId);

      const response: ApiResponse = {
        success: true,
        message: 'Student added to classroom successfully',
        data: result
      };

      res.status(200).json(response);
      logger.info(`Student ${studentId} added to classroom ${id}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Remove student from classroom
   */
  removeStudentFromAula = async (req: Request<{ id: string; studentId: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id, studentId } = req.params;
      const teacherId = req.user?.id;
      if (!id) throw new AppError('Param "id" is required', 400);
      if (!studentId) throw new AppError('Param "studentId" is required', 400);
      if (!teacherId) throw new AppError('Authentication required', 401);

      await this.aulaService.removeStudentFromAula(id, studentId, teacherId);

      const response: ApiResponse = {
        success: true,
        message: 'Student removed from classroom successfully'
      };

      res.status(200).json(response);
      logger.info(`Student ${studentId} removed from classroom ${id}`);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get students in classroom
   */
  getStudentsInAula = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError('Param "id" is required', 400);
      const result = await this.aulaService.getStudentsInAula(id);

      const response: ApiResponse = {
        success: true,
        message: 'Students retrieved successfully',
        data: result
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
