/* eslint-disable no-console */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { env } from "@/config/env";
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
 * @class AxiosAdapter
 * @implements {IHttpClient}
 * @description Adapter para Axios.
 * Responsabilidad: Únicamente adaptar la librería Axios a la interfaz IHttpClient.
 * No debe contener lógica de negocio (como autenticación o manejo de errores específicos).
 */
export class AxiosAdapter implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.NEXT_PUBLIC_APP_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const { status, data } = error.response;

          if (status >= 500) {
            console.error(`[AxiosAdapter] Server Error ${status}:`, data);
            // TODO: Lanzar un error genérico estandarizado de la app, ejemplo: throw new InternalServerError(data);
          }
        } else if (error.request) {
          console.error("[AxiosAdapter] Network Error:", error.message);
          // TODO: Lanzar un error genérico estandarizado de la app
        } else {
          // TODO: Lanzar un error genérico estandarizado de la app
          console.error("[AxiosAdapter] Request Setup Error:", error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  private transformConfig(config?: HttpClientConfig): AxiosRequestConfig {
    if (!config) return {};

    return {
      headers: config?.headers,
      params: config?.params,
      signal: config?.signal,
    };
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  async get<T>({ path, config }: IGetRequest): Promise<T> {
    const axiosConfig = this.transformConfig(config);
    const response = await this.axiosInstance.get<T>(path, axiosConfig);
    return this.handleResponse<T>(response);
  }

  async post<T>({ path, data, config }: IPostRequest): Promise<T> {
    const axiosConfig = this.transformConfig(config);
    const response = await this.axiosInstance.post<T>(path, data, axiosConfig);
    return this.handleResponse<T>(response);
  }

  async patch<T>({ path, data, config }: IPatchRequest): Promise<T> {
    const axiosConfig = this.transformConfig(config);
    const response = await this.axiosInstance.patch<T>(path, data, axiosConfig);
    return this.handleResponse<T>(response);
  }

  async put<T>({ path, data, config }: IPutRequest): Promise<T> {
    const axiosConfig = this.transformConfig(config);
    const response = await this.axiosInstance.put<T>(path, data, axiosConfig);
    return this.handleResponse<T>(response);
  }

  async delete<T>({ path, config }: IDeleteRequest): Promise<T> {
    const axiosConfig = this.transformConfig(config);
    const response = await this.axiosInstance.delete<T>(path, axiosConfig);
    return this.handleResponse<T>(response);
  }

  async request<T>({ path, method, data, config }: IRequest): Promise<T> {
    const axiosConfig = this.transformConfig(config);

    const response = await this.axiosInstance.request<T>({
      url: path,
      method: method,
      data: data,
      ...axiosConfig,
    });

    return this.handleResponse(response);
  }
}

export const httpClient = new AxiosAdapter();
