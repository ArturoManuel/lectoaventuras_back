import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const openapiDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'LectoAventuras API',
    version: '1.0.0',
    description: 'API documentation for LectoAventuras backend',
  },
  servers: [
    {
      url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      PruebaLessonItem: {
        type: 'object',
        properties: {
          cant_complet: { type: 'integer', example: 25 },
          due_date: { type: 'string', format: 'date-time', example: '2025-09-13T14:30:53.000Z' },
          name_test: { type: 'string', example: 'Compresión Lectora Nivel 1' },
          uuid_test: { type: 'string', example: 'asdljsalkdjaasdk' },
        },
        required: ['cant_complet', 'due_date', 'name_test', 'uuid_test'],
      },
      PruebaLessons: {
        type: 'object',
        properties: {
          uuid: { type: 'string', example: '3zfZHIzeFUz6G8ue7mED' },
          uuid_classroom: { type: 'string', example: 'EST-25-AGL001' },
          total_student: { type: 'integer', example: 40 },
          lessons: {
            type: 'array',
            items: { $ref: '#/components/schemas/PruebaLessonItem' },
          },
        },
        required: ['uuid', 'uuid_classroom', 'total_student', 'lessons'],
      },
      Student: {
        type: 'object',
        properties: {
          uuid: { type: 'string', example: 'HCXayZeXvfcmiWCI7i3mXqFe1ty2' },
          code_classroom: { type: 'string', example: 'EST-25-AGL001' },
          name: { type: 'string', example: 'noriega66' },
          name_classroom: { type: 'string', example: '3ro Primaria - Grupo A' },
          email: { type: 'string', example: 'noriega66@gmail.com' },
          preferredLanguage: { type: 'string', example: 'es' },
          role: { type: 'string', example: 'student' },
          status: { type: 'boolean', example: true },
          coins: { type: 'integer', example: 0 },
          average: { type: 'number', example: 0 },
          address: { type: 'string', nullable: true, example: null },
          age: { type: 'integer', nullable: true, example: null },
          gender: { type: 'string', nullable: true, example: null },
          phone: { type: 'string', nullable: true, example: null },
          special_needs: { type: 'string', nullable: true, example: null },
          tutor_name: { type: 'string', nullable: true, example: null },
          nivel_lectura: { type: 'string', nullable: true, example: null },
          feedback_student: { type: 'string', nullable: true, example: null },
          createdAt: { type: 'string', format: 'date-time', nullable: true, example: '2025-09-16T19:01:34.000Z' },
          date_response: { type: 'string', format: 'date-time', nullable: true, example: '2025-09-16T19:01:34.000Z' }
        },
        required: ['uuid', 'code_classroom', 'name', 'email', 'role', 'status']
      }
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

// Resolve absolute path to the project root and always scan source TS files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// This file lives at src/shared/docs/swagger.ts (or dist/shared/docs/swagger.js)
// Go up three levels to reach project root from both src and dist builds
const projectRoot = path.resolve(__dirname, '../../..');
const srcModulesGlob = path.join(projectRoot, 'src/modules/**/*.ts');

const options: swaggerJSDoc.Options = {
  definition: openapiDefinition,
  // You can enable JSDoc annotations later; for now we just generate a base spec
  apis: [srcModulesGlob],
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiOptions = {
  explorer: true,
};
