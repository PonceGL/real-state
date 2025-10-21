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
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres.",
    })
    .max(50, {
      message: "La contraseña no puede tener más de 50 caracteres.",
    }).trim(),
});