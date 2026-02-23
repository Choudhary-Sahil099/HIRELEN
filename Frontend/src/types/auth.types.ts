import type { Role } from "./user.types";

export interface JWTPayload {
  _id: string;
  name: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}