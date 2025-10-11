# Convenciones Específicas del Proyecto para Next.js 15

Este documento describe reglas y patrones de código específicos que se deben seguir en este proyecto.

## Manejadores de Ruta (Route Handlers) en Next.js 15

**Regla Importante:** En los manejadores de ruta de la API (`GET`, `POST`, `DELETE`, etc.) que reciben parámetros dinámicos, el objeto `params` es una **Promise**.

Debido a esto, el uso de `await` para desestructurar y acceder a los parámetros es **correcto y necesario**. La interfaz que define los tipos para estos `params` también debe reflejar que es una promesa.

### ✅ Ejemplo de Código Correcto:

```typescript
interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
    const { id } = await params; // El uso de 'await' aquí es intencional y correcto.
  // ... resto de la lógica
}
```
### ❌ Ejemplo de Código Incorrecto (Lo que NO se debe sugerir):

```typescript
// NO SUGERIR ESTE CAMBIO
interface Params {
  params: { id: string }; // Incorrecto, no es una Promise
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params; // Incorrecto, falta el 'await'
  // ...
}
```
Por favor, NO sugieras eliminar la Promise de la interfaz Params ni el await correspondiente al acceder a los parámetros en los manejadores de ruta. Este es el comportamiento esperado en Next.js 15.
