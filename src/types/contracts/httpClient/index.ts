type Path = string;
type Data = unknown;

export type HttpClientConfig = {
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  signal?: AbortSignal;
};

export type IGetRequest = {
  path: Path;
  config?: HttpClientConfig;
};

export type IPostRequest = {
  path: Path;
  data: Data;
  config?: HttpClientConfig;
};

export type IPatchRequest = IPostRequest;
export type IPutRequest = IPostRequest;
export type IDeleteRequest = IGetRequest;

export interface IHttpClient {
  get<T>(request: IGetRequest): Promise<T>;
  post<T>(request: IPostRequest): Promise<T>;
  patch<T>(request: IPatchRequest): Promise<T>;
  put<T>(request: IPutRequest): Promise<T>;
  delete<T>(request: IDeleteRequest): Promise<T>;
}