import { Router } from 'express';
import { AulaController } from './aula.controller.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { authenticateToken } from '../../shared/middleware/auth.middleware.js';
import { authorizeRoles } from '../../shared/middleware/authorization.middleware.js';
import { 
  createAulaSchema, 
  updateAulaSchema, 
  addStudentSchema,
  aulaQuerySchema 
} from './validators/aula.validator.js';

const router = Router();
const aulaController = new AulaController();

// Apply authentication to all routes
router.use(authenticateToken);

/**
 * @route   GET /api/aulas
 * @desc    Get all classrooms with pagination and search
 * @access  Private (Teacher, Admin)
 */
router.get(
  '/',
  authorizeRoles(['teacher', 'admin']),
  validateRequest(aulaQuerySchema, 'query'),
  aulaController.getAllAulas
);

/**
 * @route   GET /api/aulas/:id
 * @desc    Get classroom by ID
 * @access  Private (Teacher, Admin, Student - if enrolled)
 */
router.get('/:id', aulaController.getAulaById);

/**
 * @route   POST /api/aulas
 * @desc    Create new classroom
 * @access  Private (Teacher, Admin)
 */
router.post(
  '/',
  authorizeRoles(['teacher', 'admin']),
  validateRequest(createAulaSchema),
  aulaController.createAula
);

/**
 * @route   PUT /api/aulas/:id
 * @desc    Update classroom
 * @access  Private (Teacher - owner, Admin)
 */
router.put(
  '/:id',
  authorizeRoles(['teacher', 'admin']),
  validateRequest(updateAulaSchema),
  aulaController.updateAula
);

/**
 * @route   DELETE /api/aulas/:id
 * @desc    Delete classroom
 * @access  Private (Teacher - owner, Admin)
 */
router.delete(
  '/:id',
  authorizeRoles(['teacher', 'admin']),
  aulaController.deleteAula
);

/**
 * @route   POST /api/aulas/:id/students
 * @desc    Add student to classroom
 * @access  Private (Teacher - owner, Admin)
 */
router.post(
  '/:id/students',
  authorizeRoles(['teacher', 'admin']),
  validateRequest(addStudentSchema),
  aulaController.addStudentToAula
);

/**
 * @route   DELETE /api/aulas/:id/students/:studentId
 * @desc    Remove student from classroom
 * @access  Private (Teacher - owner, Admin)
 */
router.delete(
  '/:id/students/:studentId',
  authorizeRoles(['teacher', 'admin']),
  aulaController.removeStudentFromAula
);

/**
 * @route   GET /api/aulas/:id/students
 * @desc    Get students in classroom
 * @access  Private (Teacher - owner, Admin)
 */
router.get(
  '/:id/students',
  authorizeRoles(['teacher', 'admin']),
  aulaController.getStudentsInAula
);

export { router as aulaRoutes };
