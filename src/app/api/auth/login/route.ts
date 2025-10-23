import { NextRequest, NextResponse } from "next/server";

import { loginService } from "@/app/api/auth/login.service";
import { handleHttpError } from "@/lib/errorResponse";
import { LoginResponse } from "@/types/http";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await loginService.createLogin(body);
    const response: LoginResponse = {
      success: true,
      message: "Login successful",
      data: token,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleHttpError(error);
  }
}