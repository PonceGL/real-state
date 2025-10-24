import { AxiosError, AxiosRequestHeaders } from "axios";
import { redirect } from "next/navigation";

import { login } from "@/actions/auth";
import { ADMIN_DASHBOARD } from "@/constants/routes";
import { logInFormSchema } from "@/lib/auth/definitions";
import { httpClient } from "@/lib/http/axiosAdapter";
import { createSession } from "@/lib/session";

jest.mock("@/lib/auth/definitions", () => ({
  logInFormSchema: {
    safeParse: jest.fn(),
  },
}));
jest.mock("@/lib/http/axiosAdapter", () => ({
  httpClient: {
    post: jest.fn(),
  },
}));
jest.mock("@/lib/session", () => ({
  createSession: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("login", () => {
  const formData = { username: "user", password: "pass" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error if validation fails", async () => {
    (logInFormSchema.safeParse as jest.Mock).mockReturnValue({
      success: false,
    });
    const result = await login(formData);
    expect(result.error).toBe("Datos inválidos");
  });

  it("should return error if no token in response", async () => {
    (logInFormSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: formData,
    });
    (httpClient.post as jest.Mock).mockResolvedValue({ data: {} });
    const result = await login(formData);
    expect(result.error).toBe("Ocurrió un error intente más tarde");
  });

  it("should call createSession and redirect on success", async () => {
    (logInFormSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: formData,
    });
    (httpClient.post as jest.Mock).mockResolvedValue({
      data: { token: "token" },
    });
    await login(formData);
    expect(createSession).toHaveBeenCalledWith("token");
    expect(redirect).toHaveBeenCalledWith(ADMIN_DASHBOARD);
  });

  it("should handle AxiosError with status 400 and custom message", async () => {
    (logInFormSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: formData,
    });
    const error = new AxiosError("Bad Request");
    error.status = 400;
    error.response = {
      data: { message: "Custom error" },
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {
        headers: { "Content-Type": "application/json" } as AxiosRequestHeaders,
      },
    };
    (httpClient.post as jest.Mock).mockRejectedValue(error);
    const result = await login(formData);
    expect(result.error).toBe("Custom error");
  });

  it("should handle AxiosError with status 400 and default message", async () => {
    (logInFormSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: formData,
    });
    const error = new AxiosError("Bad Request");
    error.status = 400;
    error.response = {
      data: {},
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: {
        headers: { "Content-Type": "application/json" } as AxiosRequestHeaders,
      },
    };
    (httpClient.post as jest.Mock).mockRejectedValue(error);
    const result = await login(formData);
    expect(result.error).toBe("Usuario o contraseña inválidas");
  });

  it("should handle other errors", async () => {
    (logInFormSchema.safeParse as jest.Mock).mockReturnValue({
      success: true,
      data: formData,
    });
    (httpClient.post as jest.Mock).mockRejectedValue(new Error("fail"));
    const result = await login(formData);
    expect(result.error).toBe("Ocurrió un error intente más tarde");
  });
});
