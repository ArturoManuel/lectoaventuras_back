declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  /** Minimal type declarations for swagger-ui-express to satisfy TS in this project. */
  export const serve: RequestHandler[];

  export function setup(
    swaggerDoc?: any,
    options?: any,
    customCss?: string,
    customfavIcon?: string,
    swaggerUrl?: string,
    customSiteTitle?: string
  ): RequestHandler;

  const swaggerUi: {
    serve: typeof serve;
    setup: typeof setup;
  };

  export default swaggerUi;
}
