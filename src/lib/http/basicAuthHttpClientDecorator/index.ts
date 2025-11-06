import { cloudinaryService } from "@/lib/cloudinary/cloudinary.service";
import { httpClient as baseHttpClient } from "@/lib/http/axiosAdapter";
import {
  HttpClientConfig,
  IDeleteRequest,
  IGetRequest,
  IHttpClient,
  IPatchRequest,
  IPostRequest,
  IPutRequest,
  IRequest,
} from "@/types/contracts/httpClient";

/**
 * Decorador para un cliente HTTP que agrega autenticación básica a las solicitudes.
 * Utiliza el servicio de Cloudinary para obtener las credenciales.
 *
 * @implements {IHttpClient}
 */
export class BasicAuthHttpClientDecorator implements IHttpClient {
  private readonly httpClient: IHttpClient;

  /**
   * Crea una instancia del decorador con el cliente HTTP base.
   * @param {IHttpClient} httpClient - Cliente HTTP a decorar.
   */
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Fusiona la configuración de la solicitud con las credenciales de autenticación básica.
   * @param {HttpClientConfig} [config] - Configuración opcional de la solicitud.
   * @returns {HttpClientConfig} Configuración con cabecera de autenticación.
   */
  private mergeAuthConfig(config?: HttpClientConfig): HttpClientConfig {
    const credentials = this.getBasicCredentials();

    if (!credentials) {
      return config || {};
    }

    const authHeaders = {
      Authorization: credentials,
    };

    return {
      ...config,
      headers: {
        ...config?.headers,
        ...authHeaders,
      },
    };
  }

  /**
   * Obtiene las credenciales de autenticación básica desde el servicio de Cloudinary.
   * @returns {string|null} Cadena de autenticación básica o null si falla.
   */
  private getBasicCredentials(): string | null {
    try {
      return cloudinaryService.getBasicAuth();
    } catch {
      return null;
    }
  }

  /**
   * Realiza una solicitud GET con autenticación básica.
   * @template T
   * @param {IGetRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async get<T>({ path, config }: IGetRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.get<T>({ path, config: authConfig });
  }

  /**
   * Realiza una solicitud POST con autenticación básica.
   * @template T
   * @param {IPostRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async post<T>({ path, data, config }: IPostRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.post<T>({ path, data, config: authConfig });
  }

  /**
   * Realiza una solicitud PATCH con autenticación básica.
   * @template T
   * @param {IPatchRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async patch<T>({ path, data, config }: IPatchRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.patch<T>({ path, data, config: authConfig });
  }

  /**
   * Realiza una solicitud PUT con autenticación básica.
   * @template T
   * @param {IPutRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async put<T>({ path, data, config }: IPutRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.put<T>({ path, data, config: authConfig });
  }

  /**
   * Realiza una solicitud DELETE con autenticación básica.
   * @template T
   * @param {IDeleteRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async delete<T>({ path, config }: IDeleteRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.delete<T>({ path, config: authConfig });
  }

  async request<T>(request: IRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(request.config);

    return this.httpClient.request<T>({
      ...request,
      config: authConfig,
    });
  }
}

export const basicAuthHttpClient = new BasicAuthHttpClientDecorator(
  baseHttpClient
);
