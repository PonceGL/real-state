import { USER_ROLES } from "./users";

export interface LoginFormData {
  username: string;
  password: string;
}


export interface Session {
  sub: string;
  email: string;
  role: USER_ROLES;
  verified: boolean;
}