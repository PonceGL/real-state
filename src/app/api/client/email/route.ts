import { NextRequest, NextResponse } from "next/server";

import { clientService } from "@/app/api/client/client.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

export async function POST(request: NextRequest) {
  try {
    await isAuthenticated(request);
    const body = await request.json();
    const client = await clientService.getByEmail(body);
    return NextResponse.json(
      {
        success: true,
        message: "Client successfully obtained",
        data: client,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
