import { cloudinaryService } from "@/lib/cloudinary/cloudinary.service";
import { BasicAuthHttpClientDecorator } from "@/lib/http/basicAuthHttpClientDecorator";
import {
  IDeleteRequest,
  IGetRequest,
  IHttpClient,
  IPatchRequest,
  IPostRequest,
  IPutRequest,
} from "@/types/contracts/httpClient";

jest.mock("@/lib/cloudinary/cloudinary.service", () => ({
  cloudinaryService: {
    getBasicAuth: jest.fn(),
  },
}));

const mockedGetBasicAuth = cloudinaryService.getBasicAuth as jest.Mock;

const mockHttpClient: jest.Mocked<IHttpClient> = {
  get: jest.fn().mockResolvedValue({ data: "get_success" }),
  post: jest.fn().mockResolvedValue({ data: "post_success" }),
  patch: jest.fn().mockResolvedValue({ data: "patch_success" }),
  put: jest.fn().mockResolvedValue({ data: "put_success" }),
  delete: jest.fn().mockResolvedValue({ data: "delete_success" }),
};

describe("BasicAuthHttpClientDecorator", () => {
  let decorator: BasicAuthHttpClientDecorator;

  beforeEach(() => {
    jest.clearAllMocks();

    decorator = new BasicAuthHttpClientDecorator(mockHttpClient);
  });

  describe("when credentials are valid", () => {
    const mockCredentials = "Basic MOCK_CREDENTIALS_123";

    beforeEach(() => {
      mockedGetBasicAuth.mockReturnValue(mockCredentials);
    });

    it("should add Authorization header to GET requests", async () => {
      const request: IGetRequest = { path: "/third-party/data" };
      await decorator.get(request);

      expect(mockedGetBasicAuth).toHaveBeenCalledTimes(1);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/third-party/data",
        config: {
          headers: {
            Authorization: mockCredentials,
          },
        },
      });
    });

    it("should add Authorization header to POST requests", async () => {
      const request: IPostRequest = { path: "/post", data: { a: 1 } };
      await decorator.post(request);

      expect(mockHttpClient.post).toHaveBeenCalledWith(
        expect.objectContaining({
          config: { headers: { Authorization: mockCredentials } },
        })
      );
    });

    it("should add Authorization header to PATCH requests", async () => {
      const request: IPatchRequest = { path: "/patch", data: { a: 1 } };
      await decorator.patch(request);
      expect(mockHttpClient.patch).toHaveBeenCalledWith(
        expect.objectContaining({
          config: { headers: { Authorization: mockCredentials } },
        })
      );
    });

    it("should add Authorization header to PUT requests", async () => {
      const request: IPutRequest = { path: "/put", data: { a: 1 } };
      await decorator.put(request);
      expect(mockHttpClient.put).toHaveBeenCalledWith(
        expect.objectContaining({
          config: { headers: { Authorization: mockCredentials } },
        })
      );
    });

    it("should add Authorization header to DELETE requests", async () => {
      const request: IDeleteRequest = { path: "/delete" };
      await decorator.delete(request);
      expect(mockHttpClient.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          config: { headers: { Authorization: mockCredentials } },
        })
      );
    });

    it("should merge Authorization header with existing headers (Edge Case)", async () => {
      const request: IGetRequest = {
        path: "/third-party/data",
        config: {
          headers: { "X-Custom-Header": "my-value" },
          params: { id: 1 },
        },
      };
      await decorator.get(request);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/third-party/data",
        config: {
          headers: {
            "X-Custom-Header": "my-value",
            Authorization: mockCredentials,
          },
          params: { id: 1 },
        },
      });
    });
  });

  describe("when credentials service fails (no credentials)", () => {
    beforeEach(() => {
      mockedGetBasicAuth.mockImplementation(() => {
        throw new Error("Cloudinary service failed");
      });
    });

    it("should NOT add Authorization header if getBasicCredentials fails", async () => {
      const request: IGetRequest = { path: "/data" };
      await decorator.get(request);

      expect(mockedGetBasicAuth).toHaveBeenCalledTimes(1);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/data",
        config: {},
      });
    });

    it("should return null if getBasicCredentials returns null", async () => {
      mockedGetBasicAuth.mockReturnValue(null);
      const request: IGetRequest = { path: "/data" };
      await decorator.get(request);

      expect(mockedGetBasicAuth).toHaveBeenCalledTimes(1);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/data",
        config: {},
      });
    });

    it("should keep existing config even if getBasicCredentials fails", async () => {
      const request: IGetRequest = {
        path: "/data",
        config: { params: { search: "test" } },
      };
      await decorator.get(request);

      expect(mockHttpClient.get).toHaveBeenCalledWith({
        path: "/data",
        config: { params: { search: "test" } },
      });

      expect(
        mockHttpClient.get.mock.calls[0][0].config?.headers
      ).toBeUndefined();
    });
  });

  describe("Client Call Delegation", () => {
    it("should return the data from the wrapped client on success", async () => {
      mockedGetBasicAuth.mockReturnValue("Basic 123");

      const expectedResponse = { data: "get_success" };
      mockHttpClient.get.mockResolvedValue(expectedResponse);

      const result = await decorator.get({ path: "/test" });

      expect(result).toBe(expectedResponse);
    });

    it("should propagate errors from the wrapped client", async () => {
      mockedGetBasicAuth.mockReturnValue("Basic 123");

      const clientError = new Error("500 Server Error (from client)");

      mockHttpClient.get.mockRejectedValue(clientError);

      await expect(decorator.get({ path: "/test" })).rejects.toThrow(
        clientError
      );
    });
  });
});
