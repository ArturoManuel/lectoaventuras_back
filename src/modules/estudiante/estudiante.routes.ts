import { Router } from 'express';
import { EstudianteController } from './estudiante.controller.js';
import { authenticateToken } from '../../shared/middleware/auth.middleware.js';
import { authorizeRoles } from '../../shared/middleware/authorization.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { createEstudianteSchema, updateEstudianteSchema } from './validators/estudiante.validator.js';

const router = Router();
const controller = new EstudianteController();

/**
 * @openapi
 * /api/estudiante:
 *   get:
 *     summary: Listar estudiantes
 *     tags:
 *       - Estudiantes
 *     parameters:
 *       - in: query
 *         name: aulas
 *         schema:
 *           type: string
 *         required: false
 *         description: "Códigos de aula separados por coma (ej: A101,B205,C303) para filtrar por code_classroom."
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: "Nombre del estudiante (búsqueda contains, case-insensitive)."
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 */
// Public GET endpoints
router.get('/', controller.getAll);

/**
 * @openapi
 * /api/estudiante/{id}:
 *   get:
 *     summary: Detalle de estudiante por ID
 *     tags:
 *       - Estudiantes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: No encontrado
 */
router.get('/:id', controller.getById);

// Protected write endpoints
router.post('/', authenticateToken, authorizeRoles(['admin']), validateRequest(createEstudianteSchema), controller.create);
router.put('/:id', authenticateToken, authorizeRoles(['admin']), validateRequest(updateEstudianteSchema), controller.update);
router.delete('/:id', authenticateToken, authorizeRoles(['admin']), controller.remove);

export { router as estudianteRoutes };
