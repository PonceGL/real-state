import z from "zod";

export const logInFormSchema = z.object({
  username: z
    .email("Ingresa un correo válido")
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50).trim(),
  password: z
    .string()
    .min(2, {
      message: "La contraseña debe tener al menos 2 caracteres.",
    })
    .max(50).trim(),
});