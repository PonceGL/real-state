# Guía de Solución: Configuración de Commitlint (CommonJS vs. ES Modules)

## Problema

El archivo de configuración `commitlint.config.js` funciona en un sistema operativo (ej. macOS) pero falla en otro (ej. Windows), o viceversa. El error cambia dependiendo de si se usa la sintaxis `module.exports` o `export default`.

* `export default { ... }` funciona en un entorno pero falla en otro.
* `module.exports = { ... }` arregla el problema en un entorno, pero rompe la ejecución de los hooks en el otro.

## Causa Raíz: CommonJS (CJS) vs. ES Modules (ESM)

Este conflicto se debe a los dos sistemas de módulos de JavaScript que utiliza Node.js.

1.  **CommonJS (CJS):** El sistema clásico de Node.js. Usa `module.exports` y `require()`. Es el modo por defecto.
2.  **ES Modules (ESM):** El estándar moderno de JavaScript. Usa `export default` e `import`.

Un proyecto le dice a Node.js que use ESM para todos los archivos `.js` añadiendo la siguiente línea a `package.json`:
```json
// package.json
{
  "type": "module"
}
```