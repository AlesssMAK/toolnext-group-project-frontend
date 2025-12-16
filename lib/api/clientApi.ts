import { User } from "@/types/user";
import nextServer from "./api";

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
}

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}
