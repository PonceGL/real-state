# Autenticación y Manejo de Errores

Este documento describe la implementación del sistema de autenticación y manejo de errores en la aplicación.

## Sistema de Autenticación

La autenticación en la aplicación está implementada usando JSON Web Tokens (JWT) a través de la librería `jose`. El sistema consta de los siguientes componentes:

### Middleware de Autenticación

El middleware de autenticación está implementado en `src/app/lib/auth/index.ts` y proporciona la función `isAuthenticated` que:

1. Verifica la existencia del token API en las variables de entorno
2. Extrae el token Bearer del encabezado de autorización
3. Verifica el JWT usando la librería jose
4. Retorna el payload del token si la autenticación es exitosa

```typescript
export async function isAuthenticated(request: NextRequest): Promise<{ payload: JWTPayload }> {
  const apiToken = process.env.API_TOKEN;
  if (!apiToken) throw new InternalServerErrorException(...);
  
  const secret = new TextEncoder().encode();
  const authHeader = request.headers.get("authorization");
  
  const token = authHeader?.split(" ")[1];
  if (!token) throw new AuthenticationError("Authorization token is missing");
  
  const { payload } = await jwtVerify(token, secret, {
      algorithms: [JWT_ALGORITHM],
    });
  return { payload };
}
```

### Protección de Rutas

Las rutas protegidas utilizan el middleware de autenticación. Por ejemplo, en los endpoints de usuario:

```typescript
// En las rutas protegidas
export async function GET(request: NextRequest) {
  try {
    const { payload } = await isAuthenticated(request);
    // El usuario está autenticado, proceder con la lógica
    ...
  } catch (error) {
    return handleHttpError(error);
  }
}
```

## Sistema de Manejo de Errores

La aplicación implementa un sistema centralizado de manejo de errores que:

1. Define tipos de errores personalizados:
   - AuthenticationError: Para errores de autenticación
   - InternalServerErrorException: Para errores internos del servidor

2. Provee un manejador centralizado (`handleHttpError`) que:
   - Procesa diferentes tipos de errores
   - Retorna respuestas HTTP apropiadas
   - Oculta detalles de error en producción

### Tipos de Errores

Los errores personalizados extienden de la clase base Error:

```typescript
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerErrorException extends Error {
  constructor(message: string) {
    super(message);
  }
}
```

### Uso en los Endpoints

Los endpoints utilizan el manejo centralizado de errores mediante try-catch:

```typescript
export async function POST(request: NextRequest) {
  try {
    // Lógica del endpoint
    const { payload } = await isAuthenticated(request);
    const body = await request.json();
    const newUser = await userService.create(body);
    return NextResponse.json({
      success: true,
      message: "User successfully created",
      data: newUser,
    }, { status: 201 });
  } catch (error) {
    // Manejo centralizado de errores
    return handleHttpError(error);
  }
}
```

## Mejores Prácticas

1. **Seguridad**:
   - Todos los endpoints sensibles deben usar el middleware de autenticación
   - Los tokens deben ser manejados de forma segura
   - Los errores en producción no deben exponer información sensible

2. **Manejo de Errores**:
   - Usar el sistema centralizado de manejo de errores
   - Capturar y manejar apropiadamente diferentes tipos de errores
   - Proporcionar mensajes de error útiles pero seguros

3. **Respuestas HTTP**:
   - Usar códigos de estado HTTP apropiados
   - Mantener un formato consistente en las respuestas
   - Incluir información útil en las respuestas de error

4. **Variables de Entorno**:
   - Asegurar que todas las claves y tokens necesarios estén configurados
   - Usar diferentes configuraciones para desarrollo y producción
   - Validar la presencia de variables de entorno requeridas

## Flujo de Autenticación

1. El cliente hace una solicitud con un token Bearer en el encabezado
2. El middleware `isAuthenticated` verifica el token
3. Si la autenticación es exitosa, se procesa la solicitud
4. Si hay un error, se maneja de forma centralizada
5. La respuesta se envía al cliente con el código de estado apropiado
