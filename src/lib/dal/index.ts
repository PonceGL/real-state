import "server-only";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { env } from "@/config/env";
import { JWT_ALGORITHM } from "@/constants/auth";
import { API, LOGIN } from "@/constants/routes";
import { GetUserByEmailResponse } from "@/types/http";

import { authHttpClient } from "../http/sessionAuthHttpClientDecorator";

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
    redirect(LOGIN);
  }

  return { token: cookie, session: payload };
});

export const getUser = cache(async () => {
  try {
    const { session } = await verifySession();
    if (!session) return null;

    const { data } = await authHttpClient.post<GetUserByEmailResponse>({
      path: API.USER.EMAIL,
      data: {
        email: session.email,
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
