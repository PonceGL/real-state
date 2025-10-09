# API de Gestión de Propiedades

Este documento describe el sistema completo de gestión de propiedades inmobiliarias, incluyendo endpoints, servicios, modelos de datos y DTOs.

## 📋 Tabla de Contenidos

- [Arquitectura General](#arquitectura-general)
- [Prerrequisitos y Flujo de Trabajo](#prerrequisitos-y-flujo-de-trabajo)
- [Modelos de Datos](#modelos-de-datos)
- [DTOs y Validación](#dtos-y-validación)
- [Endpoints de la API](#endpoints-de-la-api)
- [Servicios](#servicios)
- [Funcionalidades Especiales](#funcionalidades-especiales)
- [Ejemplos de Uso](#ejemplos-de-uso)

## 🏗️ Arquitectura General

El sistema de propiedades está construido con una arquitectura modular que incluye:

- **Modelos de MongoDB**: Esquemas con discriminadores para diferentes tipos de propiedades
- **DTOs con Zod**: Validación estricta de datos de entrada
- **Servicios**: Lógica de negocio centralizada
- **Endpoints REST**: API RESTful con autenticación
- **Población dinámica**: Sistema flexible para incluir datos relacionados

### Flujo de Datos

```
Cliente → Endpoint → Servicio → Modelo MongoDB → Base de Datos
   ↓         ↓         ↓           ↓
Validación → Lógica → Esquema → Persistencia
```

## 🔄 Prerrequisitos y Flujo de Trabajo

### ⚠️ Dependencias Requeridas

Para crear una propiedad, es **necesario** que existan previamente en la base de datos:

1. **Usuario registrado** - El campo `agent` debe contener el ID de un usuario existente
2. **Imágenes subidas** - Los campos `mainImage` e `images` deben contener IDs de imágenes previamente creadas

### 📋 Flujo Completo de Trabajo

#### 1. Crear Usuario

Primero debes crear un usuario en el sistema:

```http
POST /api/user
```

**Documentación completa:** [Sistema de Usuarios](/docs/api-flows/api-users.md)

#### 2. Autenticarse

Obtener token JWT para operaciones protegidas:

```http
POST /api/auth/login
```

**Documentación completa:** [Autenticación y Recuperación de Contraseña](/docs/api-flows/auth-flujo.md)

#### 3. Subir Imágenes

Crear las imágenes que se usarán en la propiedad:

```http
POST /api/image
Content-Type: multipart/form-data
```

**Documentación completa:** [API de Gestión de Imágenes](/docs/api-flows/api-images.md)

**Nota:** Las imágenes se suben automáticamente a Cloudinary. Consulta [Integración con Cloudinary](/docs/api-flows/cloudinary.md) para más detalles.

#### 4. Crear Propiedad

Finalmente, crear la propiedad usando los IDs obtenidos:

```http
POST /api/property
Authorization: Bearer {jwt-token}
```

### 🔗 Referencias Cruzadas

- **[Sistema de Usuarios](/docs/api-flows/api-users.md)** - Para crear y gestionar usuarios
- **[Autenticación](/docs/api-flows/authentication.md)** - Para obtener tokens JWT
- **[API de Imágenes](/docs/api-flows/api-images.md)** - Para subir imágenes a Cloudinary
- **[Cloudinary](/docs/api-flows/cloudinary.md)** - Para configuración de almacenamiento

## 🗄️ Modelos de Datos

### Modelo Base: Property

El modelo base define la estructura común para todas las propiedades:

```typescript
interface IProperty {
  title: string;
  slug: string; // Generado automáticamente
  description: string;
  price: {
    value: number;
    currency: string;
  };
  transactionType: "Venta" | "Renta";
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitud, latitud]
    address: string;
    city: string;
    state: string;
    zipCode?: string;
  };
  mainImage: Types.ObjectId | IImage;
  images: Types.ObjectId[] | IImage[];
  agent: Types.ObjectId | IUser;
  propertyType: "Casa" | "Terreno" | "Otro";
}
```

### Discriminadores por Tipo de Propiedad

#### 1. Casa (House)

```typescript
interface IHouse extends IProperty {
  bedrooms: number;
  bathrooms: number;
  garageSpaces: number;
  constructionSqMeters: number;
  landSqMeters?: number;
}
```

#### 2. Terreno (Land)

```typescript
interface ILand extends IProperty {
  landSqMeters: number;
  frontageMeters?: number;
  depthMeters?: number;
  topography?: "Plano" | "Ascendente" | "Descendente" | "Irregular";
  hasServices: boolean;
}
```

#### 3. Otro (OtherProperty)

```typescript
interface IOtherProperty extends IProperty {
  features: {
    key: string;
    value: string;
  }[];
}
```

### Características del Esquema

- **Índice geoespacial**: Para búsquedas por ubicación
- **Slug único**: Generado automáticamente para URLs amigables
- **Timestamps**: `createdAt` y `updatedAt` automáticos
- **Referencias**: Relaciones con usuarios e imágenes

## ✅ DTOs y Validación

### DTO Base

```typescript
const basePropertyDto = z.object({
  title: z.string().min(1, "El título es obligatorio."),
  description: z.string().min(1, "La descripción es obligatoria."),
  price: z.object({
    value: z.number().positive("El precio debe ser positivo."),
    currency: z.string().default("MXN"),
  }),
  transactionType: z.enum(["Venta", "Renta"]),
  location: z.object({
    coordinates: z.tuple([z.number(), z.number()]),
    address: z.string().min(1, "La dirección es obligatoria."),
    city: z.string().min(1, "La ciudad es obligatoria."),
    state: z.string().min(1, "El estado es obligatorio."),
    zipCode: z.string().optional(),
  }),
  mainImage: z.string(),
  images: z.array(z.string()),
  agent: z.string(),
});
```

### DTOs Específicos

#### Casa

```typescript
const houseDto = basePropertyDto.extend({
  propertyType: z.literal("Casa"),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  garageSpaces: z.number().int().min(0).default(0),
  constructionSqMeters: z.number().positive(),
  landSqMeters: z.number().positive().optional(),
});
```

#### Terreno

```typescript
const landDto = basePropertyDto.extend({
  propertyType: z.literal("Terreno"),
  landSqMeters: z.number().positive(),
  frontageMeters: z.number().positive().optional(),
  depthMeters: z.number().positive().optional(),
  topography: z
    .enum(["Plano", "Ascendente", "Descendente", "Irregular"])
    .optional(),
  hasServices: z.boolean().default(false),
});
```

#### Otro

```typescript
const otherPropertyDto = basePropertyDto.extend({
  propertyType: z.literal("Otro"),
  features: z.array(
    z.object({
      key: z.string(),
      value: z.string(),
    })
  ),
});
```

### Validación con Discriminadores

```typescript
export const createPropertyDto = z.discriminatedUnion("propertyType", [
  houseDto,
  landDto,
  otherPropertyDto,
]);
```

## 🌐 Endpoints de la API

### Base URL

```
/api/property
```

### 1. Obtener Todas las Propiedades

```http
GET /api/property
```

**Parámetros de consulta:**

- `populate`: Campos a poblar (separados por comas)
  - `agent`: Información del agente
  - `images`: Todas las imágenes
  - `mainImage`: Imagen principal

**Ejemplo:**

```http
GET /api/property?populate=agent,mainImage
```

**Respuesta:**

```json
{
  "success": true,
  "message": "Properties successfully obtained",
  "data": [
    {
      "_id": "68d719e323ca506503864506",
      "title": "Casa de Prueba",
      "slug": "casa-de-prueba",
      "description": "Descripción de prueba",
      "price": {
        "value": 1000000,
        "currency": "MXN"
      },
      "transactionType": "Venta",
      "location": {
        "type": "Point",
        "coordinates": [-98.275, 19.0185],
        "address": "Dirección de prueba",
        "city": "Ciudad de prueba",
        "state": "Estado de prueba",
        "zipCode": "12345"
      },
      "mainImage": {
        "_id": "68d700497e5a6e478f0984d8",
        "url": "https://res.cloudinary.com/...",
        "publicId": "properties/main_image"
      },
      "agent": {
        "_id": "68d6feed7e5a6e478f0984be",
        "name": "Juan Pérez",
        "email": "juan@example.com"
      },
      "propertyType": "Casa",
      "bedrooms": 3,
      "bathrooms": 2,
      "garageSpaces": 1,
      "constructionSqMeters": 120,
      "landSqMeters": 200
    }
  ]
}
```

### 2. Crear Propiedad

```http
POST /api/property
```

**Autenticación:** Requerida

**⚠️ Prerrequisitos:**

- Debe existir un usuario registrado (para el campo `agent`)
- Deben existir imágenes subidas previamente (para `mainImage` e `images`)

**Body (Casa):**

```json
{
  "propertyType": "Casa",
  "title": "Casa Residencial en Lomas de Angelópolis",
  "description": "Hermosa casa de 3 recámaras con jardín privado...",
  "price": {
    "value": 2500000,
    "currency": "MXN"
  },
  "transactionType": "Venta",
  "location": {
    "coordinates": [-98.275, 19.0185],
    "address": "Blvd. de las Cascadas 123, Lomas de Angelópolis",
    "city": "San Andrés Cholula",
    "state": "Puebla",
    "zipCode": "72830"
  },
  "mainImage": "68d700497e5a6e478f0984d8", // ID de imagen existente
  "images": ["68d700527e5a6e478f0984da", "68d7005b7e5a6e478f0984dc"], // IDs de imágenes existentes
  "agent": "68d6feed7e5a6e478f0984be", // ID de usuario existente
  "bedrooms": 3,
  "bathrooms": 2,
  "garageSpaces": 1,
  "constructionSqMeters": 120,
  "landSqMeters": 200
}
```

**Body (Terreno):**

```json
{
  "propertyType": "Terreno",
  "title": "Terreno Residencial en Lomas de Angelópolis III",
  "description": "Excelente oportunidad de inversión...",
  "price": {
    "value": 1250000,
    "currency": "MXN"
  },
  "transactionType": "Venta",
  "location": {
    "coordinates": [-98.275, 19.0185],
    "address": "Blvd. de las Cascadas 789, Parque Querétaro",
    "city": "San Andrés Cholula",
    "state": "Puebla",
    "zipCode": "72830"
  },
  "mainImage": "68d700497e5a6e478f0984d8", // ID de imagen existente
  "images": ["68d700527e5a6e478f0984da", "68d7005b7e5a6e478f0984dc"], // IDs de imágenes existentes
  "agent": "68d6feed7e5a6e478f0984be", // ID de usuario existente
  "landSqMeters": 200,
  "frontageMeters": 10,
  "depthMeters": 20,
  "topography": "Plano",
  "hasServices": true
}
```

### 3. Obtener Propiedad por ID

```http
GET /api/property/{id}
```

**Parámetros de consulta:**

- `populate`: Campos a poblar (opcional)

### 4. Obtener Propiedad por Slug

```http
GET /api/property/slug/{slug}
```

**Parámetros de consulta:**

- `populate`: Campos a poblar (opcional)

**Ejemplo:**

```http
GET /api/property/slug/casa-residencial-en-lomas-de-angelopolis?populate=agent,images
```

### 5. Actualizar Propiedad

```http
PATCH /api/property/{id}
```

**Autenticación:** Requerida

**Body:** Mismos campos que la creación, pero todos opcionales

### 6. Eliminar Propiedad

```http
DELETE /api/property/{id}
```

**Autenticación:** Requerida

## ⚙️ Servicios

### PropertyService

El servicio central maneja toda la lógica de negocio:

#### Métodos Principales

- `getAll(populateFields)`: Obtiene todas las propiedades
- `getById(id, populateFields)`: Obtiene propiedad por ID
- `getBySlug(slug, populateFields)`: Obtiene propiedad por slug
- `create(propertyData)`: Crea nueva propiedad
- `update(id, data)`: Actualiza propiedad existente
- `delete(id)`: Elimina propiedad

#### Validaciones Automáticas

- **Entidades relacionadas**: Verifica que el agente y las imágenes existan
- **Generación de slug**: Crea slug único basado en el título
- **Validación de datos**: Usa Zod para validación estricta

#### Población Dinámica

El servicio soporta población selectiva de campos relacionados:

```typescript
// Poblar solo el agente
const properties = await propertyService.getAll(["agent"]);

// Poblar agente e imágenes
const properties = await propertyService.getAll(["agent", "images"]);

// Sin población
const properties = await propertyService.getAll([]);
```

## 🔧 Funcionalidades Especiales

### 1. Generación Automática de Slug

```typescript
private generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: "es",
  });
}
```

### 2. Población Dinámica

El sistema permite poblar selectivamente campos relacionados:

```typescript
private _applyDynamicPopulation<T>(
  query: Query<T, IProperty>,
  populateFields: PROPERTY_POPULATE_FIELDS[] = []
): Query<T, IProperty> {
  const populateMap = {
    agent: (q) => q.populate({
      path: PROPERTY_POPULATE_FIELDS.AGENT,
      select: "name email",
    }),
    images: (q) => q.populate({
      path: PROPERTY_POPULATE_FIELDS.IMAGES,
      select: "-__v"
    }),
    mainImage: (q) => q.populate({
      path: PROPERTY_POPULATE_FIELDS.MAIN_IMAGE,
      select: "-__v",
    }),
  };
  // ... lógica de aplicación
}
```

### 3. Validación de Entidades Relacionadas

```typescript
private async validateRelatedEntities(data: Partial<CreatePropertyDto | UpdatePropertyDTO>) {
  if (data?.agent) {
    await userService.getById(data.agent);
  }
  if (data?.mainImage) {
    await imageService.getById(data.mainImage);
  }
  if (data?.images && data?.images?.length > 0) {
    for (const imageId of data.images) {
      await imageService.getById(imageId);
    }
  }
}
```

### 4. Manejo de Errores Centralizado

```typescript
private handleServiceError(error: unknown, customMessages?: { [key: string]: string }): Error {
  if (error instanceof HttpError || error instanceof ZodError) {
    return error;
  }

  if (error instanceof MongooseError) {
    const message = customMessages?.mongoose || "Error en la base de datos.";
    return new BadRequestError(IS_DEV ? error.message : message);
  }

  const message = customMessages?.internal || "Error interno.";
  return new InternalServerErrorException(
    IS_DEV ? (error as Error).message : message
  );
}
```

## 📝 Ejemplos de Uso

### Flujo Completo: Crear una Casa

#### Paso 1: Crear Usuario (si no existe)

```javascript
const userResponse = await fetch("/api/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Juan Pérez",
    email: "juan@example.com",
    password: "password123",
    role: "agent",
    verified: true,
  }),
});
const user = await userResponse.json();
// Guardar: user.data._id para usar como agent
```

#### Paso 2: Autenticarse

```javascript
const authResponse = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "juan@example.com",
    password: "password123",
  }),
});
const auth = await authResponse.json();
// Guardar: auth.data.token para Authorization header
```

#### Paso 3: Subir Imágenes

```javascript
// Subir imagen principal
const mainImageFormData = new FormData();
mainImageFormData.append("file", mainImageFile);
mainImageFormData.append("alt", "Fachada principal de la casa");
mainImageFormData.append("folder", "propiedades/casas");

const mainImageResponse = await fetch("/api/image", {
  method: "POST",
  body: mainImageFormData,
});
const mainImage = await mainImageResponse.json();
// Guardar: mainImage.data._id para mainImage

// Subir imágenes adicionales
const additionalImages = [];
for (const file of additionalImageFiles) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("alt", "Imagen de la propiedad");
  formData.append("folder", "propiedades/casas");

  const response = await fetch("/api/image", {
    method: "POST",
    body: formData,
  });
  const image = await response.json();
  additionalImages.push(image.data._id);
}
// Guardar: additionalImages para images array
```

#### Paso 4: Crear Propiedad

```javascript
const response = await fetch("/api/property", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${auth.data.token}`,
  },
  body: JSON.stringify({
    propertyType: "Casa",
    title: "Casa Moderna en Zona Residencial",
    description: "Hermosa casa de 3 recámaras con acabados de lujo...",
    price: {
      value: 3500000,
      currency: "MXN",
    },
    transactionType: "Venta",
    location: {
      coordinates: [-98.275, 19.0185],
      address: "Calle Residencial 123, Colonia Exclusiva",
      city: "Puebla",
      state: "Puebla",
      zipCode: "72000",
    },
    mainImage: mainImage.data._id, // ID de imagen principal
    images: additionalImages, // Array de IDs de imágenes
    agent: user.data._id, // ID de usuario existente
    bedrooms: 3,
    bathrooms: 2,
    garageSpaces: 2,
    constructionSqMeters: 150,
    landSqMeters: 300,
  }),
});

const result = await response.json();
```

### Obtener Propiedades con Población

```javascript
const response = await fetch("/api/property?populate=agent,mainImage");
const result = await response.json();
```

### Buscar por Slug

```javascript
const response = await fetch(
  "/api/property/slug/casa-moderna-en-zona-residencial"
);
const result = await response.json();
```

### Resumen del Flujo de IDs

| Campo       | Tipo     | Descripción               | Origen                        |
| ----------- | -------- | ------------------------- | ----------------------------- |
| `agent`     | String   | ID del usuario agente     | Creado con `POST /api/user`   |
| `mainImage` | String   | ID de la imagen principal | Creado con `POST /api/image`  |
| `images`    | String[] | Array de IDs de imágenes  | Creados con `POST /api/image` |

**Importante:** Todos estos IDs deben existir previamente en la base de datos antes de crear la propiedad.

## 🧪 Testing

El sistema incluye tests completos que cubren:

- Creación de propiedades
- Validación de datos
- Manejo de errores
- Operaciones CRUD
- Validación de entidades relacionadas

### Ejecutar Tests

```bash
yarn test property.service.test.ts
```

## 🔒 Seguridad

- **Autenticación JWT**: Requerida para operaciones de escritura
- **Validación estricta**: Todos los datos se validan con Zod
- **Validación de referencias**: Se verifica que las entidades relacionadas existan
- **Manejo de errores**: No se exponen detalles internos en producción
- **Dependencias validadas**: El sistema verifica que existan usuarios e imágenes antes de crear propiedades

## 📊 Rendimiento

- **Índices optimizados**: Slug e índice geoespacial
- **Población selectiva**: Solo se cargan los datos necesarios
- **Queries eficientes**: Uso de `lean()` para mejor rendimiento
- **Validación temprana**: Errores detectados antes de la persistencia
