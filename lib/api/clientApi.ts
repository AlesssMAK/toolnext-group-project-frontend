import { User } from '@/types/user';
import nextServer from './api';
import { UserToolsResponse } from '@/types/tool';

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface AuthResponse {
  user: User;
}

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<AuthResponse>('/auth/register', data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(data: LoginRequest) {
  const res = await nextServer.post<AuthResponse>('/auth/login', data);
  return res.data.user;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout');
}

type CheckSessionRequest = {
  success: boolean;
};

export async function checkSession(): Promise<boolean> {
  try {
    await nextServer.post<CheckSessionRequest>('/auth/refresh');
    return true;
  } catch {
    return false;
  }
}

interface MeResponse {
  success: boolean;
  data: User;
}

export async function getMe(): Promise<User | null> {
  try {
    const res = await nextServer.get<MeResponse>('/users/me');
    return res.data.data;
  } catch {
    return null;
  }
}

// export type UpdateUserRequest = {
//   username: string;
// };

// export const updateMe = async (payload: UpdateUserRequest) => {
//   const res = await nextServer.patch<User>('/users/me', payload);
//   return res.data;
// };

// Клієнтський запит для підвантаження інструментів користувача, використовую для пагінації (кнопка "Показати більше")

export async function getUserToolsClient(
  userId: string,
  page = 1,
  perPage = 8
) {
  const { data } = await nextServer.get<UserToolsResponse>(
    `/users/${userId}/tools`,
    { params: { page, perPage } }
  );

  return data.data; // { tools, pagination }
}
