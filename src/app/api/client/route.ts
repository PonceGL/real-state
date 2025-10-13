import { NextRequest, NextResponse } from "next/server";

import { clientService } from "@/app/api/client/client.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

export async function GET(request: NextRequest) {
  try {
    await isAuthenticated(request);

    const clients = await clientService.getAll();
    return NextResponse.json(
      {
        success: true,
        message: "Clients successfully obtained",
        data: clients,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await isAuthenticated(request);
    const body = await request.json();
    const newClient = await clientService.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Client successfully created",
        data: newClient,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
