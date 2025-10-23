import { verifySession } from "@/lib/dal";
import { SessionAuthHttpClientDecorator } from "@/lib/http/sessionAuthHttpClientDecorator";
import {
  IDeleteRequest,
  IGetRequest,
  IHttpClient,
  IPatchRequest,
  IPostRequest,
  IPutRequest,
} from "@/types/contracts/httpClient";

jest.mock("@/lib/dal", () => ({
  verifySession: jest.fn(),
}));

const mockedVerifySession = verifySession as jest.Mock;

const mockHttpClient: jest.Mocked<IHttpClient> = {
  get: jest.fn().mockResolvedValue({ data: "get_success" }),
  post: jest.fn().mockResolvedValue({ data: "post_success" }),
  patch: jest.fn().mockResolvedValue({ data: "patch_success" }),
  put: jest.fn().mockResolvedValue({ data: "put_success" }),
  delete: jest.fn().mockResolvedValue({ data: "delete_success" }),
};

describe("SessionAuthHttpClientDecorator", () => {
  let decorator: SessionAuthHttpClientDecorator;

  beforeEach(() => {
    jest.clearAllMocks();

    decorator = new SessionAuthHttpClientDecorator(mockHttpClient);
  });

  describe("when session is valid (token exists)", () => {
    const mockToken = "mock-token-123";

    beforeEach(() => {
      mockedVerifySession.mockResolvedValue({ token: mockToken });
    });

    it("should add Authorization header to GET requests", async () => {
      const request: IGetRequest = { path: "/private/data" };
      await decorator.get(request);

      expect(mockedVerifySession).toHaveBeenCalledTimes(1);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/private/data",
        config: {
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        },
      });
    });

    it("should add Authorization header to POST requests", async () => {
      const request: IPostRequest = { path: "/private/data", data: { a: 1 } };
      await decorator.post(request);

      expect(mockHttpClient.post).toHaveBeenCalledWith({
        path: "/private/data",
        data: { a: 1 },
        config: {
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        },
      });
    });

    it("should add Authorization header to PATCH requests", async () => {
      const request: IPatchRequest = { path: "/patch", data: { a: 1 } };
      await decorator.patch(request);
      expect(mockHttpClient.patch).toHaveBeenCalledWith(
        expect.objectContaining({
          config: { headers: { Authorization: `Bearer ${mockToken}` } },
        })
      );
    });

    it("should add Authorization header to PUT requests", async () => {
      const request: IPutRequest = { path: "/put", data: { a: 1 } };
      await decorator.put(request);
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        expect.objectContaining({
          config: { headers: { Authorization: `Bearer ${mockToken}` } },
        })
      );
    });

    it("should add Authorization header to DELETE requests", async () => {
      const request: IDeleteRequest = { path: "/delete" };
      await decorator.delete(request);
      expect(mockHttpClient.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          config: { headers: { Authorization: `Bearer ${mockToken}` } },
        })
      );
    });

    it("should merge Authorization header with existing headers (Edge Case)", async () => {
      const request: IGetRequest = {
        path: "/private/data",
        config: {
          headers: { "X-Custom-Header": "my-value" },
          params: { id: 1 },
        },
      };
      await decorator.get(request);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/private/data",
        config: {
          headers: {
            "X-Custom-Header": "my-value",
            Authorization: `Bearer ${mockToken}`,
          },
          params: { id: 1 },
        },
      });
    });
  });

  describe("when session is invalid (no token)", () => {
    beforeEach(() => {
      mockedVerifySession.mockRejectedValue(new Error("Invalid session"));
    });

    it("should NOT add Authorization header if verifySession fails", async () => {
      const request: IGetRequest = { path: "/public/data" };
      await decorator.get(request);

      expect(mockedVerifySession).toHaveBeenCalledTimes(1);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/public/data",
        config: {},
      });
    });

    it("should keep existing config even if verifySession fails", async () => {
      const request: IGetRequest = {
        path: "/public/data",
        config: { params: { search: "test" } },
      };
      await decorator.get(request);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/public/data",
        config: { params: { search: "test" } },
      });

      expect(mockHttpClient.get.mock.calls[0][0].config?.headers).toBeUndefined();
    });
  });

  describe("Client Call Delegation", () => {
    it("should return the data from the wrapped client on success", async () => {
      mockedVerifySession.mockResolvedValue({ token: "abc" });

      const expectedResponse = { data: "get_success" };
      mockHttpClient.get.mockResolvedValue(expectedResponse);

      const result = await decorator.get({ path: "/test" });

      expect(result).toBe(expectedResponse);
    });

    it("should propagate errors from the wrapped client", async () => {
      mockedVerifySession.mockResolvedValue({ token: "abc" });

      const clientError = new Error("404 Not Found (from client)");

      mockHttpClient.get.mockRejectedValue(clientError);

      await expect(decorator.get({ path: "/test" })).rejects.toThrow(
        clientError
      );
    });
  });
});
