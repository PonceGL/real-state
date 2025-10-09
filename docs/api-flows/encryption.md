# 🔐 Funciones de Criptografía y Hash
Este documento describe el conjunto de funciones de criptografía disponibles, creadas para ser seguras, eficientes y compatibles tanto en el backend como en el frontend (isomórficas).

Las funciones se basan en dos tecnologías estándar de la industria:

Hashing: Se utiliza bcrypt para el hash de contraseñas de un solo sentido.

Encriptación: Se utiliza la Web Crypto API (AES-256-GCM con derivación de clave PBKDF2) para la encriptación y desencriptación de datos.

## Tabla de Contenidos

1. [Diferencia Clave: Hashing vs. Encriptación](#diferencia-clave-hashing-vs-encriptación)
2. [Funciones de Hash (bcrypt)](#funciones-de-hash-bcrypt)
    - [hashPassword](#hashpassword)
    - [comparePassword](#comparepassword)
3. [Funciones de Encriptación (AES-256-GCM)](#funciones-de-encriptación-aes-256-gcm)
    - [encryptString](#encryptstring)
    - [decryptStringg](#decryptStringg)
4. [Desencriptación de Strings](#desencriptación-de-strings)
5. [Configuración de Claves](#configuración-de-claves)
6. [Principios de Seguridad Fundamentales](#️-principios-de-seguridad-fundamentales)

## Diferencia Clave: Hashing vs. Encriptación
Es fundamental entender la diferencia para usar la herramienta correcta:

Hashing (hashPassword): Es un proceso de un solo sentido. No se puede revertir. Se usa para verificar datos sin almacenarlos en su forma original.

Caso de uso: Almacenar y verificar contraseñas de usuario.

Encriptación (encryptString): Es un proceso de dos sentidos. Los datos encriptados se pueden desencriptar si se tiene la clave correcta.

Caso de uso: Almacenar información personal sensible (ej. un token de API, datos de salud) que necesitas consultar o usar más adelante.

## Funciones de Hash (bcrypt)
Estas funciones son exclusivas para el backend, ya que bcrypt es una dependencia de Node.js.

### hashPassword
Genera un hash seguro de una contraseña. El hash incluye un "salt" automático para proteger contra ataques de tablas arcoíris.

Uso:

```typescript
import { hashPassword } from '@/app/lib/crypt';

// Ejemplo: Creando un nuevo usuario
async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  // Guardar `hashedPassword` en la base de datos
}
```


### comparePassword
Verifica si una contraseña en texto plano coincide con un hash almacenado.

Uso:

```typescript
import { comparePassword } from '@/app/lib/crypt';

// Ejemplo: Login de usuario
async function validateLogin(plainPassword: string, hashedPasswordFromDB: string) {
  const isMatch = await comparePassword(plainPassword, hashedPasswordFromDB);
  return isMatch; // true o false
}
```

## Funciones de Encriptación (AES-256-GCM)
Estas funciones son isomórficas: funcionan tanto en el backend (Node.js) como en el frontend (navegador) porque utilizan la Web Crypto API, que es un estándar web.

### encryptString
Encripta un string utilizando una clave secreta. El resultado es un string en formato Base64 que contiene el vector de inicialización (IV) y los datos cifrados.

Uso en Backend:
```typescript
import { encryptString } from '@/app/lib/crypt';

const sensitiveInfo = 'API-KEY-12345';
const encryptedInfo = await encryptString(sensitiveInfo, process.env.ENCRYPTION_KEY);
// Guardar `encryptedInfo` en la base de datos
```

#### decryptString
Desencripta un string previamente cifrado con encryptString usando la misma clave.

Uso en Backend:
```typescript
import { decryptString } from '@/app/lib/crypt';

const encryptedInfoFromDB = '...'; // String en Base64
const decryptedInfo = await decryptString(encryptedInfoFromDB, process.env.ENCRYPTION_KEY);
// Usar `decryptedInfo`
```

⚠️ Uso en Frontend: Advertencia de Seguridad Crítica
Aunque estas funciones son técnicamente funcionales en el navegador, NUNCA debes exponer tu `ENCRYPTION_KEY` secreta en el código del frontend.

Una variable de entorno como `NEXT_PUBLIC_ENCRYPTION_KEY` se incrusta en el JavaScript que se envía al cliente, lo que significa que cualquier visitante de tu web puede verla y usarla para desencriptar todos tus datos.

La encriptación/desencriptación con una clave simétrica compartida debe realizarse siempre en el backend.

## Configuración de Claves
La seguridad de la encriptación depende enteramente de la seguridad de tu clave.

Variables de Entorno Requeridas
```
Archivo: .env 
Clave secreta para encriptar y desencriptar datos en el backend.
DEBE ser una cadena de texto larga, aleatoria y única.
ENCRYPTION_KEY="tu-clave-secreta-muy-larga-y-aleatoria-generada-aqui"
```

¿Cómo generar una clave segura?
Puedes usar OpenSSL en tu terminal para generar una cadena aleatoria fuerte:

````bash
openssl rand -base64 32
````

Este comando generará una clave de 32 bytes (256 bits) codificada en Base64, ideal para esta variable.

## 🛡️ Principios de Seguridad Fundamentales
Nunca Almacenes Secretos en el Repositorio: Usa siempre variables de entorno (.env.local) y nunca subas este archivo a Git.

Nunca Expongas la Clave de Encriptación en el Frontend: Como se mencionó anteriormente, cualquier clave prefijada con `NEXT_PUBLIC_` es visible públicamente. La encriptación simétrica debe ser un proceso exclusivo del servidor.

Usa Claves Diferentes por Ambiente: Tu clave en producción debe ser diferente a la de desarrollo o staging. Gestiona esto a través de las variables de entorno de tu plataforma de hosting (Vercel, AWS, etc.).

Maneja los Errores de Desencriptación: La función decryptString lanzará un error si la clave es incorrecta o los datos están corruptos. Asegúrate de capturar este error (try...catch) para evitar que tu aplicación falle y para manejar intentos maliciosos (ej. registrar el intento fallido).

Considera la Rotación de Claves (Avanzado): Para aplicaciones de alta seguridad, es una buena práctica cambiar (rotar) la ENCRYPTION_KEY periódicamente. Esto requiere una estrategia para poder seguir desencriptando datos antiguos con claves antiguas mientras se encriptan los nuevos datos con la clave nueva.