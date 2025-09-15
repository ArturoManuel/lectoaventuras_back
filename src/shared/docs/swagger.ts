import swaggerJSDoc from 'swagger-jsdoc';

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

const options: swaggerJSDoc.Options = {
  definition: openapiDefinition,
  // You can enable JSDoc annotations later; for now we just generate a base spec
  apis: [
    // Add patterns like below if you start adding JSDoc @swagger annotations
    // 'src/modules/**/*.ts',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);

export const swaggerUiOptions = {
  explorer: true,
};
