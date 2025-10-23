import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { httpClient } from "@/lib/http/axiosAdapter";

import { getUser, verifySession } from "./index";

jest.mock("next/headers");
jest.mock("jose");
jest.mock("next/navigation");
jest.mock("@/lib/http/axiosAdapter");

const cookiesMock = cookies as unknown as jest.Mock;
const jwtVerifyMock = jwtVerify as unknown as jest.Mock;
const redirectMock = redirect as unknown as jest.Mock;
const httpClientPostMock = httpClient.post as unknown as jest.Mock;

class TextEncoderMock {
  encode(input: string): Uint8Array {
    return new Uint8Array(Buffer.from(input));
  }
}

describe("verifySession", () => {
  let oldTextEncoder: typeof global.TextEncoder;
  beforeEach(() => {
    jest.clearAllMocks();
    oldTextEncoder = global.TextEncoder;
  });
  afterEach(() => {
    global.TextEncoder = oldTextEncoder;
  });

  it("throws error if no session cookie found", async () => {
    cookiesMock.mockReturnValue({ get: () => undefined });
    await expect(verifySession()).rejects.toThrow("No session cookie found");
  });

  it("redirects if payload is missing", async () => {
    cookiesMock.mockReturnValue({ get: () => ({ value: "token" }) });
    global.TextEncoder = TextEncoderMock as unknown as typeof TextEncoder;
    jwtVerifyMock.mockResolvedValue({ payload: undefined });
    await verifySession();
    expect(redirectMock).toHaveBeenCalledWith("/login");
  });

  it("returns token and session if valid", async () => {
    cookiesMock.mockReturnValue({ get: () => ({ value: "token" }) });
    global.TextEncoder = TextEncoderMock as unknown as typeof TextEncoder;
    jwtVerifyMock.mockResolvedValue({ payload: { email: "test@example.com" } });
    const result = await verifySession();
    expect(result).toEqual({
      token: "token",
      session: { email: "test@example.com" },
    });
  });
});

describe("getUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cookiesMock.mockReturnValue({ get: () => ({ value: "token" }) });
    global.TextEncoder = TextEncoderMock as unknown as typeof TextEncoder;
    jwtVerifyMock.mockResolvedValue({ payload: { email: "test@example.com" } });
  });

  it("returns null if verifySession throws", async () => {
    cookiesMock.mockReturnValue({ get: () => undefined });
    await expect(getUser()).resolves.toBeNull();
  });

  it("returns null if session is missing", async () => {
    jwtVerifyMock.mockResolvedValue({ payload: null });
    await expect(getUser()).resolves.toBeNull();
  });

  it("returns null if httpClient throws", async () => {
    httpClientPostMock.mockRejectedValue(new Error("fail"));
    await expect(getUser()).resolves.toBeNull();
  });

  it("returns null if no data returned", async () => {
    httpClientPostMock.mockResolvedValue({ data: null });
    await expect(getUser()).resolves.toBeNull();
  });

  it("returns user data if successful", async () => {
    httpClientPostMock.mockResolvedValue({
      data: { id: 1, email: "test@example.com" },
    });
    const result = await getUser();
    expect(result).toEqual({ id: 1, email: "test@example.com" });
  });
});
