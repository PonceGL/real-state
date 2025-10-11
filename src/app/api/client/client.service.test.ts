/**
 * @jest-environment node
 */

import { ErrorDescription, MongoServerError } from "mongodb";
import { MongooseError, Query } from "mongoose";
import { unknown, ZodError } from "zod";

import { Client, IClient } from "@/app/api/client/client.entity";
import { clientService } from "@/app/api/client/client.service";
import {
  CreateClientDto,
  createClientDto,
  FindClientByEmailDto,
  findClientByEmailDto,
  UpdateClientDto,
  updateClientDto,
} from "@/app/api/client/dtos/client.dto";
import { propertyService } from "@/app/api/property/property.service";
import {
  BadRequestError,
  HttpError,
  InternalServerErrorException,
  NotFoundException,
} from "@/lib/httpErrors";

jest.mock("@/lib/mongodb");

jest.mock("@/app/api/property/property.service", () => ({
  propertyService: {
    getById: jest.fn(),
  },
}));

jest.mock("@/app/api/client/client.entity", () => ({
  Client: {
    find: jest.fn(() => ({
      select: jest.fn(),
    })),
    findById: jest.fn(() => ({
      select: jest.fn(),
    })),
    findOne: jest.fn(() => ({
      select: jest.fn(),
    })),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

const createMockQuery = <T = IClient>(
  resolveValue: T | null | { _id: string } | { message: string }
): Query<T, IClient> =>
  ({
    exec: jest.fn().mockResolvedValue(resolveValue),
    set: jest.fn(),
    save: jest.fn().mockResolvedValue(resolveValue),
    lean: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue(resolveValue),
    populate: jest.fn().mockReturnThis(),
  } as unknown as Query<T, IClient>);

const mockedClientModel = jest.mocked(Client);

describe("ClientService getAll", () => {
  it("should return all clients", async () => {
    const clients = [
      {
        _id: "68e8550b74fe24702d3d8ca2",
        email: "rosa13@mail.com",
        propertiesOfInterest: [],
        tags: ["problematica"],
        createdAt: "2025-10-10T00:36:27.932Z",
        updatedAt: "2025-10-10T00:37:57.581Z",
      },
      {
        _id: "68e8559774fe24702d3d8cb1",
        email: "pedro_robles@mail.com",
        propertiesOfInterest: ["68e4500ae7a59e5aa7cd76cf"],
        tags: ["posible"],
        createdAt: "2025-10-10T00:38:47.462Z",
        updatedAt: "2025-10-10T00:39:13.741Z",
      },
      {
        _id: "68e857bb74fe24702d3d8cb9",
        email: "rosalia32ff@mail.com",
        propertiesOfInterest: ["68e4500ae7a59e5aa7cd76cf"],
        tags: [],
        createdAt: "2025-10-10T00:47:55.333Z",
        updatedAt: "2025-10-10T00:47:55.333Z",
      },
    ];
    mockedClientModel.find.mockReturnValue(
      createMockQuery<IClient[]>(clients as unknown as IClient[])
    );

    const result = await clientService.getAll();

    expect(result).toEqual(clients);
  });

  it("should throw BadRequestError on database error", async () => {
    const mongooseError = new MongooseError("Error en la base de datos.");
    (mockedClientModel.find().select as jest.Mock).mockRejectedValue(
      mongooseError
    );

    await expect(clientService.getAll()).rejects.toThrow(BadRequestError);
  });
});

describe("ClientService getById", () => {
  it("should return a client by id", async () => {
    const client = {
      _id: "68e8550b74fe24702d3d8ca2",
      email: "rosa13@mail.com",
      propertiesOfInterest: [],
      tags: ["problematica"],
      createdAt: "2025-10-10T00:36:27.932Z",
      updatedAt: "2025-10-10T00:37:57.581Z",
    };
    mockedClientModel.findById.mockReturnValue(
      createMockQuery<IClient>(client as unknown as IClient)
    );

    const result = await clientService.getById(client._id);

    expect(result).toEqual(client);
  });

  it("should throw BadRequestError on database error", async () => {
    mockedClientModel.findById.mockReturnValue(createMockQuery<IClient>(null));

    await expect(clientService.getById("invalid_id")).rejects.toThrow(
      NotFoundException
    );
  });

  it("should throw BadRequestError on database error", async () => {
    const mongooseError = new MongooseError("Error en la base de datos.");
    (
      mockedClientModel.findById("invalid_id").select as jest.Mock
    ).mockRejectedValue(mongooseError);

    await expect(clientService.getById("invalid_id")).rejects.toThrow(
      BadRequestError
    );
  });
});

describe("ClientService getByEmail", () => {
  it("should return a client by email", async () => {
    const client = {
      _id: "68e8550b74fe24702d3d8ca2",
      email: "rosa13@mail.com",
      propertiesOfInterest: [],
      tags: ["problematica"],
      createdAt: "2025-10-10T00:36:27.932Z",
      updatedAt: "2025-10-10T00:37:57.581Z",
    };
    mockedClientModel.findOne.mockReturnValue(
      createMockQuery<IClient>(client as unknown as IClient)
    );

    const result = await clientService.getByEmail({ email: client.email });

    expect(result).toEqual(client);
  });

  it("should throw ZodError on database error", async () => {
    const mockZodError = [
      {
        code: "invalid_value" as const,
        values: [""],
        path: ["email"],
        message: "El email es invalido",
      },
    ];
    jest.spyOn(findClientByEmailDto, "parse").mockImplementation(() => {
      throw new ZodError(mockZodError);
    });

    try {
      await clientService.getByEmail({ email: "invalid_email" });
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it("should throw NotFoundException if client is not found", async () => {
    jest
      .spyOn(findClientByEmailDto, "parse")
      .mockReturnValue({ email: "rosa244@mail.com" });

    mockedClientModel.findOne.mockReturnValue(createMockQuery<IClient>(null));

    await expect(
      clientService.getByEmail({ email: "rosa244@mail.com" })
    ).rejects.toThrow(NotFoundException);
  });
});

describe("ClientService create", () => {
  it("should create and return a new client", async () => {
    const newClientData: CreateClientDto = {
      email: "yoli123tghy@mail.com",
      propertiesOfInterest: ["68e4500ae7a59e5aa7cd76cf"],
    } as CreateClientDto;

    jest.spyOn(createClientDto, "parse").mockReturnValue(newClientData);

    (propertyService.getById as jest.Mock).mockResolvedValue({
      _id: "68e4500ae7a59e5aa7cd76cf",
      title: "Terreno Residencial en Lomas de Angelópolis III",
      slug: "terreno-residencial-en-lomas-de-angelopolis-iii",
      description:
        "Excelente oportunidad de inversión. Terreno plano de 200 metros cuadrados ubicado en uno de los clústers más exclusivos de la zona. Ideal para construir la casa de tus sueños. Cuenta con todos los servicios a pie de calle y seguridad 24 horas.",
      price: {
        value: 1250000,
        currency: "MXN",
      },
      propertyType: "terreno",
      transactionType: "venta",
      location: {
        coordinates: [-98.275, 19.0185],
        address: "Blvd. de las Cascadas 789, Parque Querétaro, Cascatta",
        city: "San Andrés Cholula",
        state: "Puebla",
        zipCode: "72830",
      },
      status: "active",
      draft: true,
      hidePrice: false,
      frontageMeters: 10,
      depthMeters: 20,
      topography: "plano",
      hasServices: true,
      plotSize: 200,
      createdAt: "2025-10-06T23:26:02.826Z",
      updatedAt: "2025-10-06T23:26:02.826Z",
    });

    mockedClientModel.findOne.mockReturnValue(createMockQuery<IClient>(null));
    mockedClientModel.create.mockReturnValue({
      email: "yoli123tghy@mail.com",
      propertiesOfInterest: ["68e4500ae7a59e5aa7cd76cf"],
      tags: [],
      _id: "68e9ad6f86561f3d9cb4b297",
      createdAt: "2025-10-11T01:05:51.368Z",
      updatedAt: "2025-10-11T01:05:51.368Z",
      __v: 0,
    } as never);

    const result = await clientService.create(newClientData);

    expect(result).toBeDefined();
  });

  it("should throw ZodError if property type is invalid", async () => {
    const mockZodError = [
      {
        code: "invalid_value" as const,
        values: [""],
        path: ["color"],
        message: "El color no es invalido",
      },
    ];
    jest.spyOn(createClientDto, "parse").mockImplementation(() => {
      throw new ZodError(mockZodError);
    });

    try {
      await clientService.create({ color: 325 } as unknown as CreateClientDto);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});

describe("ClientService update", () => {
  it("should update and return the client", async () => {
    const initialClient = {
      email: "yoli123tghy@mail.com",
      propertiesOfInterest: ["68e4500ae7a59e5aa7cd76cf"],
      tags: [],
      _id: "68e9ad6f86561f3d9cb4b297",
      createdAt: "2025-10-11T01:05:51.368Z",
      updatedAt: "2025-10-11T01:05:51.368Z",
      __v: 0,
    };

    jest.spyOn(updateClientDto, "parse").mockReturnValue(initialClient);

    mockedClientModel.findById.mockReturnValue(
      createMockQuery<IClient>(initialClient as unknown as IClient)
    );

    (propertyService.getById as jest.Mock).mockResolvedValue({
      _id: "68e4500ae7a59e5aa7cd76cf",
      title: "Terreno Residencial en Lomas de Angelópolis III",
      slug: "terreno-residencial-en-lomas-de-angelopolis-iii",
      description:
        "Excelente oportunidad de inversión. Terreno plano de 200 metros cuadrados ubicado en uno de los clústers más exclusivos de la zona. Ideal para construir la casa de tus sueños. Cuenta con todos los servicios a pie de calle y seguridad 24 horas.",
      price: {
        value: 1250000,
        currency: "MXN",
      },
      propertyType: "terreno",
      transactionType: "venta",
      location: {
        coordinates: [-98.275, 19.0185],
        address: "Blvd. de las Cascadas 789, Parque Querétaro, Cascatta",
        city: "San Andrés Cholula",
        state: "Puebla",
        zipCode: "72830",
      },
      status: "active",
      draft: true,
      hidePrice: false,
      frontageMeters: 10,
      depthMeters: 20,
      topography: "plano",
      hasServices: true,
      plotSize: 200,
      createdAt: "2025-10-06T23:26:02.826Z",
      updatedAt: "2025-10-06T23:26:02.826Z",
    });

    mockedClientModel.findByIdAndUpdate.mockReturnValue({
      ...initialClient,
      tags: ["importante"],
    } as never);

    const result = await clientService.update(initialClient._id, {
      tags: ["importante"],
    });

    expect(result.tags).toHaveLength(1);
    expect(result.tags).toContain("importante");
  });

  it("should throw ZodError if property type is invalid", async () => {
    const mockZodError = [
      {
        code: "invalid_value" as const,
        values: [""],
        path: ["color"],
        message: "El color no es invalido",
      },
    ];
    jest.spyOn(updateClientDto, "parse").mockImplementation(() => {
      throw new ZodError(mockZodError);
    });

    try {
      await clientService.update("qeff", {
        color: 435,
      } as unknown as UpdateClientDto);
      fail("Expected function to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
});

describe("ClientService update", () => {
  it("should delete a client and return a success message", async () => {
    const initialClient = {
      email: "yoli123tghy@mail.com",
      propertiesOfInterest: ["68e4500ae7a59e5aa7cd76cf"],
      tags: [],
      _id: "68e9ad6f86561f3d9cb4b297",
      createdAt: "2025-10-11T01:05:51.368Z",
      updatedAt: "2025-10-11T01:05:51.368Z",
      __v: 0,
    };

    jest.spyOn(updateClientDto, "parse").mockReturnValue(initialClient);

    mockedClientModel.findById.mockReturnValue(
      createMockQuery<IClient>(initialClient as unknown as IClient)
    );

    mockedClientModel.findByIdAndDelete.mockReturnValue(initialClient as never);

    const result = await clientService.delete("68e9ad6f86561f3d9cb4b297");

    expect(result).toEqual({ message: "Cliente eliminado correctamente." });
  });

  it("should throw BadRequestError if client is not found", async () => {
    const initialClient = {
      email: "yoli123tghy@mail.com",
      propertiesOfInterest: ["68e4500ae7a59e5aa7cd76cf"],
      tags: [],
      _id: "68e9ad6f86561f3d9cb4b297",
      createdAt: "2025-10-11T01:05:51.368Z",
      updatedAt: "2025-10-11T01:05:51.368Z",
      __v: 0,
    };

    jest.spyOn(updateClientDto, "parse").mockReturnValue(initialClient);

    const mongooseError = new MongoServerError(
      "Error UUID" as unknown as ErrorDescription
    );

    (
      mockedClientModel.findById("68e9ad6f86561f3d9cb4b297").select as jest.Mock
    ).mockRejectedValue(mongooseError);

    await expect(clientService.getById("68e9ad6f86561f3d9cb4b297")).rejects.toThrow(
      BadRequestError
    );

    await expect(
      clientService.delete("68e9ad6f86561f3d9cb4b297")
    ).rejects.toThrow(BadRequestError);
  });
});
