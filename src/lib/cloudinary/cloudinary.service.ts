import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_PRESET,
  CLOUDINARY_URL,
} from "@/constants/cloudinary";
import { basicAuthHttpClient } from "@/lib/http/basicAuthHttpClientDecorator";
import { NotFoundException } from "@/lib/httpErrors";
import {
  Images,
  ImagesByFolderSucces,
  ImagesUpload,
  UploadImageSucces,
} from "@/types/cloudinary/image";

export class CloudinaryService {
  private static URL: string = CLOUDINARY_URL;
  private static username: string = CLOUDINARY_API_KEY;
  private static password: string = CLOUDINARY_API_SECRET;

  public getBasicAuth() {
    const credentials = Buffer.from(
      `${CloudinaryService.username}:${CloudinaryService.password}`
    ).toString("base64");
    return `Basic ${credentials}`;
  }

  public async getByFolder(folder: string) {
    try {
      const { resources } = await basicAuthHttpClient.get<ImagesByFolderSucces>(
        {
          path: `${CloudinaryService.URL}/resources/image?prefix=${folder}&type=upload`,
        }
      );
      return resources;
    } catch {
      throw new Error("Error in getByFolder"); // TODO: handle
    }
  }

  public async getByPublicId(publicId: string): Promise<Images> {
    try {
      const image = await basicAuthHttpClient.get<Images>({
        path: `${CloudinaryService.URL}/resources/image/upload/${publicId}`,
      });

      if (!image) throw new NotFoundException("Recurso no encontrado.");

      return image;
    } catch {
      throw new NotFoundException("Recurso no encontrado.");
    }
  }

  public async upload({ file, folder }: ImagesUpload) {
    const data = new FormData();
    data.append("upload_preset", CLOUDINARY_PRESET);
    data.append("folder", folder);
    data.append("file", file);

    try {
      const response = await basicAuthHttpClient.post<UploadImageSucces>({
        path: `${CloudinaryService.URL}/image/upload`,
        data: data,
        config: {
          headers: {
            "Content-Type": undefined,
          },
        },
      });

      return response;
    } catch {
      throw new Error("Error in upload"); // TODO: handle
    }
  }

  public async deleteByAssetId(assetId: string) {
    const data = new FormData();
    data.append("asset_ids[]", assetId);

    try {
      const response = basicAuthHttpClient.request({
        method: "delete",
        path: `${CloudinaryService.URL}/resources`,
        data: data,
        config: {
          headers: {
            "Content-Type": undefined,
          },
        },
      });
      return response;
    } catch {
      throw new Error("Error in delete"); // TODO: handle
    }
  }
}

export const cloudinaryService = new CloudinaryService();
