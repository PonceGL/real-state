import { mockEnv } from "@mocks/env";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import type { AxiosAdapter as AxiosAdapterType } from "@/lib/http/axiosAdapter";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

const mockInterceptorHandler: {
  onFulfilled: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected: (error: AxiosError) => Promise<unknown>;
} = {
  onFulfilled: (value) => value,
  onRejected: (error) => Promise.reject(error),
};

mockedAxios.create.mockReturnValue(
  mockAxiosInstance as unknown as AxiosInstance
);

mockAxiosInstance.interceptors.response.use.mockImplementation(
  (onFulfilled, onRejected) => {
    if (onFulfilled) mockInterceptorHandler.onFulfilled = onFulfilled;
    if (onRejected) mockInterceptorHandler.onRejected = onRejected;
  }
);

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { AxiosAdapter } = require("./index");

describe("AxiosAdapter", () => {
  let adapter: AxiosAdapterType;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedAxios.create.mockReturnValue(
      mockAxiosInstance as unknown as AxiosInstance
    );
    mockAxiosInstance.interceptors.response.use.mockImplementation(
      (onFulfilled, onRejected) => {
        if (onFulfilled) mockInterceptorHandler.onFulfilled = onFulfilled;
        if (onRejected) mockInterceptorHandler.onRejected = onRejected;
      }
    );

    adapter = new AxiosAdapter();

    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should create an axios instance with the correct config", () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: mockEnv.NEXT_PUBLIC_APP_URL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
    });
  });

  it("should register the response interceptor", () => {
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function)
    );
  });

  it("should handle GET requests correctly", async () => {
    const mockResponse = { data: { id: 1, name: "Test" } };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const result = await adapter.get({ path: "/test" });

    expect(mockAxiosInstance.get).toHaveBeenCalledWith("/test", {});
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle POST requests correctly", async () => {
    const mockData = { name: "New" };
    const mockResponse = { data: { id: 2, ...mockData } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const result = await adapter.post({ path: "/test", data: mockData });

    expect(mockAxiosInstance.post).toHaveBeenCalledWith("/test", mockData, {});
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle PATCH requests correctly", async () => {
    const mockData = { name: "Updated" };
    const mockResponse = { data: { id: 1, ...mockData } };
    mockAxiosInstance.patch.mockResolvedValue(mockResponse);

    const result = await adapter.patch({ path: "/test/1", data: mockData });

    expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
      "/test/1",
      mockData,
      {}
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle PUT requests correctly", async () => {
    const mockData = { id: 1, name: "Replaced" };
    const mockResponse = { data: mockData };
    mockAxiosInstance.put.mockResolvedValue(mockResponse);

    const result = await adapter.put({ path: "/test/1", data: mockData });

    expect(mockAxiosInstance.put).toHaveBeenCalledWith("/test/1", mockData, {});
    expect(result).toEqual(mockResponse.data);
  });

  it("should handle DELETE requests correctly", async () => {
    const mockResponse = { data: { success: true } };
    mockAxiosInstance.delete.mockResolvedValue(mockResponse);

    const result = await adapter.delete({ path: "/test/1" });

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith("/test/1", {});
    expect(result).toEqual(mockResponse.data);
  });

  it("should transform a full config to AxiosRequestConfig", async () => {
    const config = {
      headers: { "X-Test": "true" },
      params: { query: "search" },
      signal: new AbortController().signal,
    };
    const expectedAxiosConfig = {
      headers: config.headers,
      params: config.params,
      signal: config.signal,
    };
    mockAxiosInstance.get.mockResolvedValue({ data: {} });

    await adapter.get({ path: "/config-test", config });

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      "/config-test",
      expectedAxiosConfig
    );
  });

  it("should handle an empty or undefined config", async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: {} });
    await adapter.get({ path: "/no-config" });
    expect(mockAxiosInstance.get).toHaveBeenCalledWith("/no-config", {});
  });

  describe("Response Interceptor (Errors)", () => {
    it("should log a 500 error and reject the promise", async () => {
      const error = {
        response: { status: 500, data: "Internal Server Error" },
      } as AxiosError;

      await expect(mockInterceptorHandler.onRejected(error)).rejects.toEqual(
        error
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[AxiosAdapter] Server Error 500:",
        "Internal Server Error"
      );
    });

    it("should NOT log a 404 error but still reject", async () => {
      const error = {
        response: { status: 404, data: "Not Found" },
      } as AxiosError;

      await expect(mockInterceptorHandler.onRejected(error)).rejects.toEqual(
        error
      );
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it("should log a network error and reject", async () => {
      const error = {
        request: {},
        message: "Network Error",
      } as AxiosError;

      await expect(mockInterceptorHandler.onRejected(error)).rejects.toEqual(
        error
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[AxiosAdapter] Network Error:",
        "Network Error"
      );
    });

    it("should log a request setup error and reject", async () => {
      const error = {
        message: "Request setup error",
      } as AxiosError;

      await expect(mockInterceptorHandler.onRejected(error)).rejects.toEqual(
        error
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "[AxiosAdapter] Request Setup Error:",
        "Request setup error"
      );
    });

    it("should handle the onFulfilled (success) passthrough", () => {
      const mockResponse = { data: "ok" } as AxiosResponse;
      const result = mockInterceptorHandler.onFulfilled(mockResponse);
      expect(result).toBe(mockResponse);
    });
  });
});
