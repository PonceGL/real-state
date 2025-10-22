import "server-only";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { env } from "@/config/env";
import { JWT_ALGORITHM } from "@/constants/auth";
import { httpClient } from "@/lib/http/axiosAdapter";
import { GetUserByEmailResponse } from "@/types/http";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    throw new Error("No session cookie found");
  }

  const secret = new TextEncoder().encode(env.SESSION_SECRET);
  const { payload } = await jwtVerify(cookie, secret, {
    algorithms: [JWT_ALGORITHM],
  });

  if (!payload) {
    redirect("/login");
  }

  return { token: cookie, session: payload };
});

export const getUser = cache(async () => {
  try {
    const { token, session } = await verifySession();
    if (!session) return null;

    const { data } = await httpClient.post<GetUserByEmailResponse>({
      path: "/api/user/email",
      data: {
        email: session.email,
      },
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    if (!data) {
      throw new Error("Ocurrió un error al obtener el usuario");
    }
    return data;
  } catch {
    return null;
  }
});
