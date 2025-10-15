"use server";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { logInFormSchema } from "@/lib/auth/definitions";
import { createSession } from "@/lib/session";
import { LoginFormData } from "@/types/auth";
import { LoginResponse } from "@/types/http";

export async function signup(
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

  const data = JSON.stringify({
    email: username,
    password: password,
  });

  const config = {
    method: "post",
    url: "http://localhost:3000/api/auth/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request<LoginResponse>(config);
    if(!response.data.data?.token){
        throw new Error("Ocurrió un error al iniciar sesión");
    }
    await createSession(response.data.data?.token)
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
  }

redirect('/dashboard')
}
