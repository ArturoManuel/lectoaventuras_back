declare module 'swagger-jsdoc' {
  /** Minimal type declarations for swagger-jsdoc v6 to satisfy TS in this project. */
  namespace swaggerJSDoc {
    interface Options {
      definition: any;
      apis: string[];
    }
  }

  function swaggerJSDoc(options: swaggerJSDoc.Options): any;

  export = swaggerJSDoc;
}
