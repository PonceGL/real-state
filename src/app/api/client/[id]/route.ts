import { NextRequest, NextResponse } from "next/server";

import { clientService } from "@/app/api/client/client.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const { id } = await params;
    const client = await clientService.getById(id);
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

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const { id } = await params;
    const body = await request.json();
    const client = await clientService.update(id, body);
    return NextResponse.json(
      {
        success: true,
        message: "Client successfully updated",
        data: client,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await isAuthenticated(request);
    const { id } = await params;
    const clients = await clientService.delete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Client successfully deleted",
        data: clients,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
