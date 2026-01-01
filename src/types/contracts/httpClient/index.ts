type Path = string;
type Data = unknown;

export type HttpClientMethod = "get" | "post" | "put" | "patch" | "delete";

export type IRequest = {
  path: Path;
  method: HttpClientMethod;
  data?: Data;
  config?: HttpClientConfig;
};

export type HttpClientConfig = {
  headers?: Record<string, string | undefined>;
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
  /**
   * @method request
   * @description Método genérico para peticiones no estándar (ej. GET con body).
   * Úsese como "escape hatch" cuando los verbos simples (get, post) no son suficientes.
   */
  request<T>(request: IRequest): Promise<T>;
}