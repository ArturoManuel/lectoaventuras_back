import { Router } from 'express';
import { EstudianteController } from './estudiante.controller.js';
import { authenticateToken } from '../../shared/middleware/auth.middleware.js';
import { authorizeRoles } from '../../shared/middleware/authorization.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { createEstudianteSchema, updateEstudianteSchema } from './validators/estudiante.validator.js';

const router = Router();
const controller = new EstudianteController();

router.use(authenticateToken);

router.get('/', authorizeRoles(['teacher', 'admin']), controller.getAll);
router.get('/:id', authorizeRoles(['teacher', 'admin']), controller.getById);
router.post('/', authorizeRoles(['admin']), validateRequest(createEstudianteSchema), controller.create);
router.put('/:id', authorizeRoles(['admin']), validateRequest(updateEstudianteSchema), controller.update);
router.delete('/:id', authorizeRoles(['admin']), controller.remove);

export { router as estudianteRoutes };
