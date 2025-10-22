type Path = string;
type Data = unknown;

export type IGetRequest<T> = {
  path: Path;
  config?: T;
}

export type IPostRequest<T> = {
  path: Path;
  data: Data;
  config?: T;
}

export type IPatchRequest<T> = IPostRequest<T>;

export type IPutRequest<T> = IPostRequest<T>;

export type IDeleteRequest<T> = IGetRequest<T>

/**
 * @interface IHttpClient
 * @description Contract that defines the methods for an HTTP client.
 * This abstraction allows us to swap the underlying HTTP library (e.g., axios, fetch)
 * without changing the application's business logic.
 */
export interface IHttpClient<C> {
  get<T>(request: IGetRequest<C>): Promise<T>;
  post<T>(request: IPostRequest<C>): Promise<T>;
  patch?<T>(request: IPatchRequest<C>): Promise<T>;
  put?<T>(request: IPutRequest<C>): Promise<T>;
  delete<T>(request: IDeleteRequest<C>): Promise<T>;
}