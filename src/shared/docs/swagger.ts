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
