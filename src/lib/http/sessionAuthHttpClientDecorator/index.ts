import { verifySession } from "@/lib/dal";
import { httpClient } from "@/lib/http/axiosAdapter";
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
 * Decorador para un cliente HTTP que agrega autenticación basada en sesión a las solicitudes.
 * Utiliza el método verifySession para obtener el token de sesión.
 *
 * @implements {IHttpClient}
 */
export class SessionAuthHttpClientDecorator implements IHttpClient {
  private readonly httpClient: IHttpClient;

  /**
   * Crea una instancia del decorador con el cliente HTTP base.
   * @param {IHttpClient} httpClient - Cliente HTTP a decorar.
   */
  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Obtiene el token de sesión usando verifySession.
   * @returns {Promise<string|null>} Token de sesión o null si falla.
   */
  private async getSessionToken(): Promise<string | null> {
    try {
      const { token } = await verifySession();
      return token;
    } catch {
      return null;
    }
  }

  /**
   * Fusiona la configuración de la solicitud con el token de sesión en la cabecera Authorization.
   * @param {HttpClientConfig} [config] - Configuración opcional de la solicitud.
   * @returns {Promise<HttpClientConfig>} Configuración con cabecera de autenticación.
   */
  private async mergeAuthConfig(
    config?: HttpClientConfig
  ): Promise<HttpClientConfig> {
    const token = await this.getSessionToken();

    if (!token) {
      return config || {};
    }

    const authHeaders = {
      Authorization: `Bearer ${token}`,
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
   * Realiza una solicitud GET con autenticación de sesión.
   * @template T
   * @param {IGetRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async get<T>({ path, config }: IGetRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.get<T>({ path, config: authConfig });
  }

  /**
   * Realiza una solicitud POST con autenticación de sesión.
   * @template T
   * @param {IPostRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async post<T>({ path, data, config }: IPostRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.post<T>({ path, data, config: authConfig });
  }

  /**
   * Realiza una solicitud PATCH con autenticación de sesión.
   * @template T
   * @param {IPatchRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async patch<T>({ path, data, config }: IPatchRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.patch<T>({ path, data, config: authConfig });
  }

  /**
   * Realiza una solicitud PUT con autenticación de sesión.
   * @template T
   * @param {IPutRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async put<T>({ path, data, config }: IPutRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.put<T>({ path, data, config: authConfig });
  }

  /**
   * Realiza una solicitud DELETE con autenticación de sesión.
   * @template T
   * @param {IDeleteRequest} params - Parámetros de la solicitud.
   * @returns {Promise<T>} Respuesta de la solicitud.
   */
  async delete<T>({ path, config }: IDeleteRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.delete<T>({ path, config: authConfig });
  }

  async request<T>(request: IRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(request.config);

    return this.httpClient.request<T>({
      ...request,
      config: authConfig,
    });
  }
}

export const authHttpClient = new SessionAuthHttpClientDecorator(httpClient);
