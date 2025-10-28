export const ADMIN_DASHBOARD = "/dashboard";
export const LOGIN = "/login";
export const FORGOT_PASSWORD = "/forgot-password";

const auth = {
  LOGIN: "/api/auth/login",
  SIGNIN: "/api/auth/signin",
  RESET_PASSWORD: "/api/auth/reset-password",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
};

const client = () => "/api/client";
client.BY_ID = (id: string) => `/api/client/${id}`;
client.EMAIL = "/api/client/email";

const contact = () => "/api/contact";
const contactAddress = () => "/api/contact/address";
contactAddress.BY_ID = (id: string) => `/api/contact/address/${id}`;
contact.ADDRESS = contactAddress;

const contactEmail = () => "/api/contact/email";
contactEmail.BY_ID = (id: string) => `/api/contact/email/${id}`;
contact.EMAIL = contactEmail;

const contactNumber = () => "/api/contact/number";
contactNumber.BY_ID = (id: string) => `/api/contact/number/${id}`;
contact.NUMBER = contactNumber;

const image = () => "/api/image";
image.BY_ID = (id: string) => `/api/image/${id}`;
image.MANY = "/api/image/many";

const neighborhood = () => "/api/neighborhood";
neighborhood.BY_ID = (id: string) => `/api/neighborhood/${id}`;
neighborhood.SLUG = "/api/neighborhood/slug";

const property = () => "/api/property";
property.BY_ID = (id: string) => `/api/property/${id}`;
property.SLUG = (slug: string) => `/api/property/slug/${slug}`;

const user = () => "/api/user";
user.BY_ID = (id: string) => `/api/user/${id}`;
user.EMAIL = "/api/user/email";

/**
 * Contrato de rutas del API para evitar magic strings.
 * * - Módulos (ej. CLIENT): Invocables. Devuelven la ruta base.
 * Uso: `API.CLIENT()` -> "/api/client"
 * * - Sub-rutas estáticas (ej. EMAIL): Propiedades. Devuelven la ruta completa.
 * Uso: `API.CLIENT.EMAIL` -> "/api/client/email"
 * * - Sub-rutas dinámicas (ej. BY_ID): Funciones. Devuelven la ruta interpolada.
 * Uso: `API.CLIENT.BY_ID("123")` -> "/api/client/123"
 */
export const API = {
  AUTH: auth,
  CLIENT: client,
  CONTACT: contact,
  IMAGE: image,
  NEIGHBORHOOD: neighborhood,
  PROPERTY: property,
  USER: user,
} as const; 