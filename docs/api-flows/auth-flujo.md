# Autenticación y Recuperación de Contraseña

Este documento describe el flujo de inicio de sesión y recuperación de contraseña implementado en el proyecto.

## Inicio de Sesión

- **Ruta:** `/api/auth/login`
- **Proceso:**
  1. El usuario envía su email y contraseña.
  2. Se valida la información y se busca el usuario en la base de datos.
  3. Si la contraseña es correcta, se genera un token JWT y se retorna.
  4. Si la autenticación falla, se retorna un error.

## Recuperación de Contraseña

- **Solicitar recuperación:**
  - **Ruta:** `/api/auth/forgot-password`
  - El usuario envía su email.
  - Si el email existe, se envía un correo con un enlace para restablecer la contraseña (incluye un token de recuperación).
  - El enlace expira en 15 minutos.

- **Restablecer contraseña:**
  - **Ruta:** `/api/auth/reset-password`
  - El usuario accede al enlace, envía el token y la nueva contraseña.
  - Si el token es válido, se actualiza la contraseña.

## Seguridad
- Los tokens JWT se firman con un secreto definido en las variables de entorno.
- Las contraseñas se almacenan de forma segura usando hash.
- El sistema nunca revela si un email existe o no en la base de datos.

## Tests
- Se incluyen pruebas unitarias para los servicios de login y recuperación de contraseña.

## Archivos relevantes
- `src/app/api/auth/login.service.ts`: Lógica principal de login y recuperación.
- `src/app/lib/sendMail/index.ts`: Servicio para envío de correos.
- `src/app/api/auth/dtos/forgotPassword.dto.ts` y `resetPassword.dto.ts`: Validaciones de datos.

---

Para más detalles técnicos, revisa este archivo y el código fuente relacionado.
