import { IUser } from "@/app/api/user/user.entity";

export interface HttpResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}


export type LoginResponse = HttpResponse<{ token: string }>
export type GetUserByEmailResponse = HttpResponse<IUser>