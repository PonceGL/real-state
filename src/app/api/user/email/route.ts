import { NextRequest, NextResponse } from "next/server";

import { userService } from "@/app/api/user/user.service";
import { isAuthenticated } from "@/lib/auth";
import { handleHttpError } from "@/lib/errorResponse";
import { AuthorizationError } from "@/lib/httpErrors";
import { GetUserByEmailResponse } from "@/types/http";
import { USER_ROLES } from "@/types/users";

export async function POST(request: NextRequest) {
  try {
    const { payload } = await isAuthenticated(request);
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new AuthorizationError("Unauthorized");
    }
    const body = await request.json();
    const user = await userService.getByEmail(body);
    const response: GetUserByEmailResponse = {
      success: true,
      message: "User successfully obtained",
      data: user,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return handleHttpError(error);
  }
}
