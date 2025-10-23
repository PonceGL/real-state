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
} from "@/types/contracts/httpClient";

export class BasicAuthHttpClientDecorator implements IHttpClient { 
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

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

  private getBasicCredentials(): string | null {
    try {
      return cloudinaryService.getBasicAuth();
    } catch {
      return null;
    }
  }

  async get<T>({ path, config }: IGetRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.get<T>({ path, config: authConfig });
  }

  async post<T>({ path, data, config }: IPostRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.post<T>({ path, data, config: authConfig });
  }

  async patch<T>({ path, data, config }: IPatchRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.patch<T>({ path, data, config: authConfig });
  }

  async put<T>({ path, data, config }: IPutRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.put<T>({ path, data, config: authConfig });
  }

  async delete<T>({ path, config }: IDeleteRequest): Promise<T> {
    const authConfig = this.mergeAuthConfig(config);
    return this.httpClient.delete<T>({ path, config: authConfig });
  }
}

export const thirdPartyHttpClient = new BasicAuthHttpClientDecorator(
  baseHttpClient
);
