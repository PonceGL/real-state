"use server";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { logInFormSchema } from "@/lib/auth/definitions";
import { httpClient } from "@/lib/http/axiosAdapter";
import { createSession } from "@/lib/session";
import { LoginFormData } from "@/types/auth";
import { LoginResponse } from "@/types/http";

export async function login(
  formData: LoginFormData
): Promise<{ error: string | null }> {
  const validatedFields = logInFormSchema.safeParse({
    username: formData.username,
    password: formData.password,
  });

  if (!validatedFields.success) {
    return {
      error: "Datos inválidos",
    };
  }

  const { username, password } = validatedFields?.data;

  try {
    const { data } = await httpClient.post<LoginResponse>({
      path: "/api/auth/login",
      data: {
        email: username,
        password: password,
      },
    });

    if (!data?.token) {
      throw new Error("Ocurrió un error al iniciar sesión");
    }
    await createSession(data?.token);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 400) {
        return {
          error:
            error.response?.data?.message ||
            ("Usuario o contraseña inválidas" as string),
        };
      }
    }

    return {
      error: "Ocurrió un error intente más tarde",
    };
  }

  redirect("/dashboard");
}
