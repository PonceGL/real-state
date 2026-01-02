import { cloudinaryService } from "@/lib/cloudinary/cloudinary.service";
import { basicAuthHttpClient } from "@/lib/http/basicAuthHttpClientDecorator";
import {
  Images,
  ImagesByFolderSucces,
  UploadImageSucces,
} from "@/types/cloudinary/image";

jest.mock("@/constants/cloudinary", () => ({
  CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/test-cloud",
  CLOUDINARY_API_KEY: "test-api-key",
  CLOUDINARY_API_SECRET: "test-api-secret",
  CLOUDINARY_PRESET: "test-preset",
}));

jest.mock("@/lib/http/basicAuthHttpClientDecorator", () => ({
  basicAuthHttpClient: {
    get: jest.fn(),
    post: jest.fn(),
    request: jest.fn(),

    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedHttpClient = basicAuthHttpClient as jest.Mocked<
  typeof basicAuthHttpClient
>;

const mockImages: Images[] = [
  {
    asset_id: "test-asset-1",
    public_id: "test-public-1",
    format: "jpg",
    version: 1,
    resource_type: "image",
    type: "upload",
    created_at: "2023-01-01T00:00:00Z",
    bytes: 1024,
    width: 800,
    height: 600,
    folder: "test-folder",
    access_mode: "public",
    url: "http://test.com/image1.jpg",
    secure_url: "https://test.com/image1.jpg",
  },
];

const mockUploadResponse: UploadImageSucces = {
  asset_id: "test-asset-1",
  public_id: "test-public-1",
  version: 1,
  version_id: "test-version-1",
  signature: "test-signature",
  width: 800,
  height: 600,
  format: "jpg",
  resource_type: "image",
  created_at: "2023-01-01T00:00:00Z",
  tags: [],
  pages: 1,
  bytes: 1024,
  type: "upload",
  etag: "test-etag",
  placeholder: false,
  url: "http://test.com/image1.jpg",
  secure_url: "https://test.com/image1.jpg",
  folder: "test-folder",
  access_mode: "public",
  image_metadata: {
    XResolution: "",
    YResolution: "",
    ResolutionUnit: "",
    UserComment: "",
    ExifImageWidth: "",
    ExifImageHeight: "",
    XMPToolkit: "",
    PixelsPerUnitX: "",
    PixelsPerUnitY: "",
    PixelUnits: "",
    ProfileDescription: "",
    Colorspace: "",
    DPI: "",
  },
  quality_analysis: { focus: 0.95 },
  original_filename: "test.jpg",
  illustration_score: 0,
  semi_transparent: false,
  grayscale: false,
};

describe("CloudinaryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getBasicAuth", () => {
    it("should return correct Basic Auth string", () => {
      const auth = cloudinaryService.getBasicAuth();
      const expected = Buffer.from("test-api-key:test-api-secret").toString(
        "base64"
      );
      expect(auth).toBe(`Basic ${expected}`);
    });
  });

  describe("getByFolder", () => {
    it("should return images when API call is successful", async () => {
      const mockResponse: ImagesByFolderSucces = { resources: mockImages };

      mockedHttpClient.get.mockResolvedValueOnce(mockResponse);

      const result = await cloudinaryService.getByFolder("test-folder");

      expect(mockedHttpClient.get).toHaveBeenCalledWith({
        path: "https://api.cloudinary.com/v1_1/test-cloud/resources/image?prefix=test-folder&type=upload",
      });

      expect(result).toEqual(mockImages);
    });

    it("should throw error when API call returns null/undefined", async () => {
      mockedHttpClient.get.mockResolvedValueOnce(null);

      await expect(
        cloudinaryService.getByFolder("test-folder")
      ).rejects.toThrow("Error in getByFolder");
    });

    it("should throw error when API call fails", async () => {
      mockedHttpClient.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(
        cloudinaryService.getByFolder("test-folder")
      ).rejects.toThrow("Error in getByFolder");
    });
  });

  describe("getByPublicId", () => {
    it("should return image when API call is successful", async () => {
      mockedHttpClient.get.mockResolvedValueOnce(mockImages[0]);

      const result = await cloudinaryService.getByPublicId("test-public-1");

      expect(mockedHttpClient.get).toHaveBeenCalledWith({
        path: "https://api.cloudinary.com/v1_1/test-cloud/resources/image/upload/test-public-1",
      });
      expect(result).toEqual(mockImages[0]);
    });

    it("should throw NotFoundException when API call returns null", async () => {
      mockedHttpClient.get.mockResolvedValueOnce(null);

      await expect(
        cloudinaryService.getByPublicId("test-public-1")
      ).rejects.toThrow("Recurso no encontrado.");
    });

    it("should throw NotFoundException when API call fails", async () => {
      mockedHttpClient.get.mockRejectedValueOnce(new Error("API Error"));

      await expect(
        cloudinaryService.getByPublicId("test-public-1")
      ).rejects.toThrow("Recurso no encontrado.");
    });
  });

  describe("upload", () => {
    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
    const mockUploadData = {
      file: mockFile,
      folder: "test-folder",
    };

    it("should upload image successfully", async () => {
      mockedHttpClient.post.mockResolvedValueOnce(mockUploadResponse);

      const result = await cloudinaryService.upload(mockUploadData);

      expect(mockedHttpClient.post).toHaveBeenCalledWith({
        path: "https://api.cloudinary.com/v1_1/test-cloud/image/upload",
        data: expect.any(FormData),

        config: {
          headers: {
            "Content-Type": undefined,
          },
        },
      });
      expect(result).toEqual(mockUploadResponse);
    });

    it("should throw error when API call fails", async () => {
      mockedHttpClient.post.mockRejectedValueOnce(new Error("Upload failed"));

      await expect(cloudinaryService.upload(mockUploadData)).rejects.toThrow(
        "Error in upload"
      );
    });
  });

  describe("deleteByAssetId", () => {
    const assetId = "test-asset-1";

    it("should delete image successfully", async () => {
      const mockDeleteResponse = { deleted: { [assetId]: "deleted" } };

      mockedHttpClient.request.mockResolvedValueOnce(mockDeleteResponse);

      const result = await cloudinaryService.deleteByAssetId(assetId);

      expect(mockedHttpClient.request).toHaveBeenCalledWith({
        method: "delete",
        path: "https://api.cloudinary.com/v1_1/test-cloud/resources",
        data: expect.any(FormData),
        config: {
          headers: {
            "Content-Type": undefined,
          },
        },
      });
      expect(result).toEqual(mockDeleteResponse);
    });

    it("should throw error when API call fails", async () => {
      mockedHttpClient.request.mockRejectedValueOnce(
        new Error("Error in delete")
      );

      await expect(cloudinaryService.deleteByAssetId(assetId)).rejects.toThrow(
        "Error in delete"
      );
    });
  });

  describe("FormData validation", () => {
    it("should create correct FormData for upload", async () => {
      const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
      const mockUploadData = {
        file: mockFile,
        folder: "test-folder",
      };

      mockedHttpClient.post.mockResolvedValueOnce({});
      await cloudinaryService.upload(mockUploadData);

      const callArgs = mockedHttpClient.post.mock.calls[0][0];
      const formData = callArgs.data as FormData;

      expect(formData.get("upload_preset")).toBe("test-preset");
      expect(formData.get("folder")).toBe("test-folder");
      expect(formData.get("file")).toBe(mockFile);
    });

    it("should create correct FormData for delete", async () => {
      const assetId = "test-asset-1";
      mockedHttpClient.request.mockResolvedValueOnce({});
      await cloudinaryService.deleteByAssetId(assetId);

      const callArgs = mockedHttpClient.request.mock.calls[0][0];
      const formData = callArgs.data as FormData;

      expect(formData.get("asset_ids[]")).toBe(assetId);
    });
  });
});
