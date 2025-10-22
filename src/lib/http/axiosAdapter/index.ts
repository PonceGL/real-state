import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { env } from "@/config/env";
import { verifySession } from "@/lib/dal";
import {
  IDeleteRequest,
  IGetRequest,
  IHttpClient,
  IPatchRequest,
  IPostRequest,
} from "@/types/contracts/httpClient";

/**
 * @class AxiosAdapter
 * @implements {IHttpClient}
 * @description Adapter for Axios. It is decoupled from the token retrieval logic.
 */
class AxiosAdapter implements IHttpClient<AxiosRequestConfig> {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.NEXT_PUBLIC_APP_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
  }

  private async getSessionToken(): Promise<string | null> {
    try {
      const { token } = await verifySession();
      return token;
    } catch {
      return null;
    }
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  async get<T>({ path, config }: IGetRequest<AxiosRequestConfig>): Promise<T> {
    const response = await this.axiosInstance.get<T>(path, config);
    return this.handleResponse(response);
  }

  async post<T>({
    path,
    data,
    config,
  }: IPostRequest<AxiosRequestConfig>): Promise<T> {
    const response = await this.axiosInstance.post<T>(path, data, config);
    return this.handleResponse(response);
  }

  async patch<T>({
    path,
    data,
    config,
  }: IPatchRequest<AxiosRequestConfig>): Promise<T> {
    const response = await this.axiosInstance.patch<T>(path, data, config);
    return this.handleResponse(response);
  }

  async delete<T>({
    path,
    config,
  }: IDeleteRequest<AxiosRequestConfig>): Promise<T> {
    const response = await this.axiosInstance.delete<T>(path, config);
    return this.handleResponse(response);
  }
}

export const httpClient = new AxiosAdapter();