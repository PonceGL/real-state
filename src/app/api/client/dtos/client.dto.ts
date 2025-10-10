import z from "zod";

export const createClientDto = z.object({
    email: z.string().email("El email es invalido").min(3, {
        message: "El email debe tener al menos 3 caracteres",
    }),
    name: z.string().min(2).max(100).optional(),
    phone: z.string().min(10).max(13).optional(),
    propertiesOfInterest: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
}).strict();

export const findClientByEmailDto = z.object({
    email: z.string().email("El email es invalido").min(3, {
        message: "El email debe tener al menos 3 caracteres",
    }),
}).strict();

export type CreateClientDto = z.infer<typeof createClientDto>;

export const updateClientDto = createClientDto.partial();

export type UpdateClientDto = z.infer<typeof updateClientDto>;

export type FindClientByEmailDto = z.infer<typeof findClientByEmailDto>;