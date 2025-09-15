# LectoAventuras Backend (TypeScript / Express)

Estructura modular y ordenada por dominios para: autenticación, aulas, pruebas y estudiantes.

## Estructura de carpetas

```
src/
  index.ts
  modules/
    auth/
      auth.controller.ts
      auth.routes.ts
      auth.service.ts
      dto/
        auth.dto.ts
      interfaces/
        auth.interface.ts
      models/
        user.model.ts
      validators/
        auth.validator.ts
    aulas/
      aula.controller.ts
      aula.routes.ts
      aula.service.ts
      dto/
        aula.dto.ts
      models/
        aula.model.ts
      validators/
        aula.validator.ts
    pruebas/
      prueba.controller.ts
      prueba.routes.ts
      prueba.service.ts
      dto/
        prueba.dto.ts
      models/
        prueba.model.ts
      validators/
        prueba.validator.ts
    estudiante/
      estudiante.controller.ts
      estudiante.routes.ts
      estudiante.service.ts
      dto/
        estudiante.dto.ts
      models/
        estudiante.model.ts
      validators/
        estudiante.validator.ts
  shared/
    interfaces/
      api-response.interface.ts
      pagination.interface.ts
    middleware/
      auth.middleware.ts
      authorization.middleware.ts
      error.middleware.ts
      validation.middleware.ts
    utils/
      app-error.ts
      logger.ts
  types/
    express/
      index.d.ts
```

## Requisitos
- Node.js 18+
- npm o pnpm

## Configuración
1. Copia `.env.example` a `.env` y ajusta valores:
```
PORT=3000
JWT_SECRET=change_me_super_secret
JWT_REFRESH_SECRET=change_me_refresh_secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
```

2. Instala dependencias:
```
npm install
```

## Scripts
- Desarrollo:
```
npm run dev
```
- Compilar:
```
npm run build
```
- Ejecutar compilado:
```
npm start
```
- Verificar tipos:
```
npm run lint:types
```

## Endpoints base
- Auth: `GET/POST /api/auth/*`
- Aulas: `GET/POST /api/aulas/*`
- Pruebas: `GET/POST /api/pruebas/*`
- Estudiantes: `GET/POST /api/estudiantes/*`
- Health: `GET /health`

## Notas
- Los servicios actualmente tienen métodos con TODOs para reemplazar con acceso a base de datos real (ORM o consultas).
- Los esquemas de validación usan `Joi`.
- La autenticación usa JWT (access + refresh) en modo placeholder; integra tu capa de persistencia para tokens y usuarios.
