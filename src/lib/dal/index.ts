import "server-only";

import axios from "axios";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

import { env } from "@/config/env";
import { JWT_ALGORITHM } from "@/constants/auth";
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
;

    const config = {
      method: "post",
      url: "http://localhost:3000/api/user/email",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
      email: session.email,
    }),
    };

    const { data } = await axios.request<GetUserByEmailResponse>(config);
    if (!data.data) {
      throw new Error("Ocurrió un error al obtener el usuario");
    }
    return data.data;
  } catch (error) {
    console.log("Failed to fetch user error: ", error);
    return null;
  }
});
