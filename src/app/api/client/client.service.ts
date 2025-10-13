import { MongoServerError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";

import { Client, IClient } from "@/app/api/client/client.entity";
import {
  CreateClientDto,
  createClientDto,
  FindClientByEmailDto,
  findClientByEmailDto,
  UpdateClientDto,
  updateClientDto,
} from "@/app/api/client/dtos/client.dto";
import { propertyService } from "@/app/api/property/property.service";
import { IS_DEV } from "@/constants/enviroment";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";
import { dbConnect } from "@/lib/mongodb";

class ClientService {
  public async getAll(): Promise<IClient[]> {
    try {
      await dbConnect();
      const clients = await Client.find({}).select("-__v");
      return clients;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener clientes.",
      });
    }
  }

  public async getById(id: string): Promise<IClient> {
    try {
      await dbConnect();
      const client = await Client.findById(id).select("-__v");
      if (!client) {
        throw new NotFoundException(
          `El cliente no se encontró${IS_DEV ? ` id: ${id}` : "."}`
        );
      }
      return client;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener el cliente.",
      });
    }
  }

  public async getByEmail(clientData: FindClientByEmailDto): Promise<IClient> {
    try {
      const validatedData = findClientByEmailDto.parse(clientData);
      await dbConnect();
      const client = await Client.findOne({
        email: validatedData.email,
      }).select("-__v");
      if (!client) {
        throw new NotFoundException(
          `El cliente no se encontró${
            IS_DEV ? ` email: ${validatedData.email}` : "."
          }`
        );
      }
      return client;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al obtener el cliente.",
      });
    }
  }

  public async create(clientData: CreateClientDto): Promise<IClient> {
    try {
      const validatedData = createClientDto.parse(clientData);
      await this.validateRelatedEntities(validatedData);
      await dbConnect();
      const existingClient = await Client.findOne({
        email: validatedData.email,
      }).select("-__v");
      if (existingClient) {
        throw new BadRequestError(
          `El cliente ya existe${
            IS_DEV ? ` email: ${validatedData.email}` : "."
          }`
        );
      }
      const client = await Client.create(validatedData);
      return client;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al crear el cliente.",
      });
    }
  }

  public async update(
    id: string,
    clientData: UpdateClientDto
  ): Promise<IClient> {
    try {
      const validatedData = updateClientDto.parse(clientData);
      await this.getById(id);
      await this.validateRelatedEntities(validatedData);
      await dbConnect();
      const updatedClient = await Client.findByIdAndUpdate(id, validatedData, {
        new: true,
      });
      if (!updatedClient) {
        throw new InternalServerErrorException("Usuario no actualizado.");
      }
      return updatedClient;
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al actualizar el cliente.",
      });
    }
  }

  public async delete(id: string): Promise<{ message: string }> {
    try {
      await this.getById(id);
      await dbConnect();
      await Client.findByIdAndDelete(id);
      return { message: "Cliente eliminado correctamente." };
    } catch (error) {
      throw this.handleServiceError(error, {
        internal: "Error al eliminar el cliente.",
      });
    }
  }

  private async validateRelatedEntities(
    data: Partial<CreateClientDto | UpdateClientDto>
  ) {
    try {
      if (
        data?.propertiesOfInterest &&
        data?.propertiesOfInterest?.length > 0
      ) {
        await Promise.all(
          data.propertiesOfInterest.map((propertyId) =>
            propertyService.getById(propertyId)
          )
        );
      }
    } catch (error) {
      throw error;
    }
  }

  private handleServiceError(
    error: unknown,
    customMessages?: { [key: string]: string }
  ): Error {
    const defaultMessage = customMessages?.internal || "Error interno.";
    if (error instanceof HttpError || error instanceof ZodError) {
      return error;
    }

    if (error instanceof MongoServerError) {
      const message = IS_DEV
        ? `code: ${error?.code}, ${JSON.stringify(error.keyValue)}`
        : defaultMessage;
      return new BadRequestError(message);
    }

    if (error instanceof MongooseError) {
      const message = customMessages?.mongoose || "Error en la base de datos.";
      return new BadRequestError(IS_DEV ? error.message : message);
    }

    return new InternalServerErrorException(
      IS_DEV ? (error as Error).message : defaultMessage
    );
  }
}

export const clientService = new ClientService();
