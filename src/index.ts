import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import swaggerUi from 'swagger-ui-express';
import { authRoutes } from './modules/auth/auth.routes.js';
import { aulaRoutes } from './modules/aulas/aula.routes.js';
import { pruebaRoutes } from './modules/pruebas/prueba.routes.js';
import { estudianteRoutes } from './modules/estudiante/estudiante.routes.js';
import { errorHandler } from './shared/middleware/error.middleware.js';
import { logger } from './shared/utils/logger.js';
import { swaggerSpec, swaggerUiOptions } from './shared/docs/swagger.js';
import type { Request, Response } from 'express';
import { initFirebase } from './shared/firebase.js';

// Load environment variables (prefer custom file, fallback to .env)
const envPath = fs.existsSync(path.resolve('back_lectoaventuras.env'))? path.resolve('back_lectoaventuras.env') : path.resolve('.env');
dotenv.config({ path: envPath });

// Initialize Firebase Admin (uses GOOGLE_APPLICATION_CREDENTIALS or ADC)
initFirebase();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
// Raw Swagger JSON (for debugging)
app.get('/api/docs.json', (req: Request, res: Response) => {
  res.json(swaggerSpec);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/aulas', aulaRoutes);
app.use('/api/pruebas', pruebaRoutes);
app.use('/api/estudiantes', estudianteRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'LectoAventuras Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Health check available at http://localhost:${PORT}/health`);
  logger.info(`API docs available at http://localhost:${PORT}/api/docs`);
});

export default app;
