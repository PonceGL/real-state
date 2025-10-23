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
} from "@/types/contracts/httpClient";

export class SessionAuthHttpClientDecorator implements IHttpClient {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  private async getSessionToken(): Promise<string | null> {
    try {
      const { token } = await verifySession();
      return token;
    } catch {
      return null;
    }
  }

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

  async get<T>({ path, config }: IGetRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.get<T>({ path, config: authConfig });
  }

  async post<T>({ path, data, config }: IPostRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.post<T>({ path, data, config: authConfig });
  }

  async patch<T>({ path, data, config }: IPatchRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.patch<T>({ path, data, config: authConfig });
  }

  async put<T>({ path, data, config }: IPutRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.put<T>({ path, data, config: authConfig });
  }

  async delete<T>({ path, config }: IDeleteRequest): Promise<T> {
    const authConfig = await this.mergeAuthConfig(config);
    return this.httpClient.delete<T>({ path, config: authConfig });
  }
}

export const authHttpClient = new SessionAuthHttpClientDecorator(httpClient);
