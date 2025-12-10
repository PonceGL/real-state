import { NextRequest, NextResponse } from "next/server";

import { seedService } from "@/app/api/seed/seed.service";
import { env } from "@/config/env";
import { handleHttpError } from "@/lib/errorResponse";

export async function POST(request: NextRequest) {
  try {
    if (env.NODE_ENV !== "development") {
      throw new Error("This route is only available in development mode");
    }
    const body = await request.json();
    const result = await seedService.seed(body);
    return NextResponse.json(
      {
        success: true,
        message: "Seed successfully executed",
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleHttpError(error);
  }
}
