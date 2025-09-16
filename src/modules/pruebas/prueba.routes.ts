import { Router } from 'express';
import { PruebaController } from './prueba.controller.js';
import { authenticateToken } from '../../shared/middleware/auth.middleware.js';
import { authorizeRoles } from '../../shared/middleware/authorization.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { createPruebaSchema, updatePruebaSchema } from './validators/prueba.validator.js';

const router = Router();
const controller = new PruebaController();

/**
 * @openapi
 * /api/pruebas:
 *   get:
 *     summary: Listar lecciones/pruebas
 *     description: Retorna el resumen de pruebas con su progreso por aula.
 *     tags:
 *       - Pruebas
 *     responses:
 *       200:
 *         description: Lista de pruebas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PruebaLessons'
 */
router.get('/', controller.getAll);

/**
 * @openapi
 * /api/pruebas/{id}:
 *   get:
 *     summary: Obtener una prueba por ID
 *     tags:
 *       - Pruebas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prueba encontrada
 *       404:
 *         description: No encontrada
 */
router.get('/:id', controller.getById);
// Protected write routes
router.post(
  '/',
  authenticateToken,
  authorizeRoles(['teacher', 'admin']),
  validateRequest(createPruebaSchema),
  controller.create,
);
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles(['teacher', 'admin']),
  validateRequest(updatePruebaSchema),
  controller.update,
);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles(['teacher', 'admin']),
  controller.remove,
);

export { router as pruebaRoutes };
