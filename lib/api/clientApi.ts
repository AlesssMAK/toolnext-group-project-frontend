import { User } from '@/types/user';
import nextServer from './api';

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

type CheckSessionRequest = {
  success: boolean;
};

export async function checkSession() {
  const res = await nextServer.post<CheckSessionRequest>('/auth/refresh');
  return res.data.success;
}

export async function getMe() {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
}

// export type UpdateUserRequest = {
//   username: string;
// };

// export const updateMe = async (payload: UpdateUserRequest) => {
//   const res = await nextServer.patch<User>('/users/me', payload);
//   return res.data;
// };
