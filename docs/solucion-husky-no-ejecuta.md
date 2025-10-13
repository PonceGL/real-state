# Guía de Solución: Hooks de Husky no se Ejecutan

## Problema

Al intentar realizar un `git commit`, los scripts definidos en la carpeta `.husky/` (como `pre-commit` o `commit-msg`) no se ejecutan. No se muestra ninguna salida de los hooks y el proceso de commit continúa como si no existieran, o falla sin un mensaje claro.

Este problema es especialmente común en entornos macOS y Linux.

## Causas Principales

El problema generalmente se reduce a una de estas tres causas:
1.  **Permisos de Archivo:** Los scripts de los hooks no tienen permisos de ejecución.
2.  **Configuración de Git:** Git no está configurado para buscar los hooks en el directorio `.husky/`.
3.  **Instalación Incompleta:** El comando de instalación de Husky nunca se ejecutó en el repositorio local.

---

## Checklist de Diagnóstico y Solución

Sigue estos pasos en orden para identificar y resolver el problema.

### Paso 1: Verificar Permisos de Ejecución (La Causa Más Común)

Git requiere que los scripts de hook sean archivos ejecutables.

* **Comando de Diagnóstico:**
    ```bash
    ls -l .husky/
    ```

* **Analizar el Resultado:**
    Fíjate en la primera columna. Si no ves una `x`, los permisos faltan.

    * ❌ **Incorrecto:** `-rw-r--r--` (falta la `x`)
    * ✅ **Correcto:** `-rwxr-xr-x` (tiene la `x`)

* **Comando de Solución:**
    Otorga permisos de ejecución a todos los archivos dentro de `.husky/`.
    ```bash
    chmod +x .husky/*
    ```

### Paso 2: Verificar la Configuración de Git (`core.hooksPath`)

Husky funciona diciéndole a Git que use el directorio `.husky/` para los hooks. Verifiquemos esa configuración.

* **Comando de Diagnóstico:**
    ```bash
    git config core.hooksPath
    ```

* **Analizar el Resultado:**
    La salida de este comando **debe ser exactamente** `.husky`. Si la salida está vacía o es diferente, ese es el problema.

* **Comando de Solución:**
    Ejecuta el comando de instalación de Husky. Su función principal es configurar esta ruta correctamente.
    ```bash
    npx husky install
    ```
    Después, vuelve a ejecutar el comando de diagnóstico para confirmar que la ruta es correcta.

### Paso 3: Asegurar la Instalación Automática

Para que Husky se configure automáticamente para todos los miembros del equipo después de un `npm install`, asegúrate de tener el script `prepare` en tu `package.json`.

* **Añadir a `package.json`:**
    ```json
    {
      "scripts": {
        "prepare": "husky install"
      }
    }
    ```

### Resumen Rápido

| Problema Potencial                | Solución Rápida             |
| --------------------------------- | --------------------------- |
| Faltan permisos de ejecución      | `chmod +x .husky/*`         |
| Git no encuentra los hooks        | `npx husky install`         |
| No funciona para nuevos clones    | Añadir script `prepare` a `package.json` |

---