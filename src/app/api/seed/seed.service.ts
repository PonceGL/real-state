import { ImageService } from "@/app/api/image/image.service";
import { CreatePropertyDto } from "@/app/api/property/dtos/property.dto";
import { PropertyService } from "@/app/api/property/property.service";
import { SEED_DATA } from "@/app/api/seed/data";
import { CreateUserDto } from "@/app/api/user/dtos/user.dto";
import { UserService } from "@/app/api/user/user.service";

class SeedService {
  private propertyService: PropertyService;
  private userService: UserService;
  private imageService: ImageService;

  constructor() {
    this.userService = new UserService();
    this.imageService = new ImageService();
    this.propertyService = new PropertyService();
  }

  async seed(data: CreateUserDto) {
    const newUser = await this.createUser(data);
    const propertiesData = await Promise.all(
      SEED_DATA.map(async (property) => {
        const { mainImage, images } = property;
        const mainImageDB = await this.imageService.saveImageToDB({
          url: mainImage.url,
          asset_id: mainImage.asset_id,
          public_id: mainImage.public_id,
          folder: mainImage.folder,
          alt: mainImage.alt,
          width: mainImage.width,
          height: mainImage.height,
        });

        const imagesDBIds = await Promise.all(
          images.map(async (image) => {
            const imageDB = await this.imageService.saveImageToDB({
              url: image.url,
              asset_id: image.asset_id,
              public_id: image.public_id,
              folder: image.folder,
              alt: image.alt,
              width: image.width,
              height: image.height,
            });
            return imageDB.id;
          })
        );

        const propertyDataWithImages = {
          ...property,
          mainImage: mainImageDB.id,
          images: imagesDBIds,
          agent: newUser.id,
        };

        return propertyDataWithImages;
      })
    );

    const properties = await Promise.all(
      propertiesData.map(async (property) => {
        return await this.propertyService.create(property as CreatePropertyDto);
      })
    );

    return {
      user: newUser,
      properties: properties,
      message: "User seeded successfully",
    };
  }

  private async createUser(userData: CreateUserDto) {
    return await this.userService.create({
      ...userData,
      role: "admin",
      verified: true,
    });
  }
}

export const seedService = new SeedService();
