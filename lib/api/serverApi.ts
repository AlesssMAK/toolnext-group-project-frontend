'use server';
import { cookies } from 'next/headers';
import nextServer from './api';
import { User } from '@/types/user';
import { UserResponse } from '@/types/user';

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.post('/auth/refresh', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<UserResponse>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  });

  return data.data;
}

export async function getUserById(userId: string): Promise<User> {
  const { data } = await nextServer.get<UserResponse>(`/users/${userId}`);
  return data.data;
}
