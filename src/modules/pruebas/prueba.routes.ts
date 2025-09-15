import { Router } from 'express';
import { PruebaController } from './prueba.controller.js';
import { authenticateToken } from '../../shared/middleware/auth.middleware.js';
import { authorizeRoles } from '../../shared/middleware/authorization.middleware.js';
import { validateRequest } from '../../shared/middleware/validation.middleware.js';
import { createPruebaSchema, updatePruebaSchema } from './validators/prueba.validator.js';

const router = Router();
const controller = new PruebaController();

router.use(authenticateToken);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', authorizeRoles(['teacher', 'admin']), validateRequest(createPruebaSchema), controller.create);
router.put('/:id', authorizeRoles(['teacher', 'admin']), validateRequest(updatePruebaSchema), controller.update);
router.delete('/:id', authorizeRoles(['teacher', 'admin']), controller.remove);

export { router as pruebaRoutes };
