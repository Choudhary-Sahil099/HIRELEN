export type Role = "interviewer" | "candidate";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}