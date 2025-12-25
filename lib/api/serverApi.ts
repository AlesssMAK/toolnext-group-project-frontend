'use server';
import { cookies } from 'next/headers';
import nextServer from './api';
import { Owner, OwnerResponse, User } from '@/types/user';
import { UserResponse } from '@/types/user';
import { UserToolsResponse } from '@/types/tool';

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

export async function getUserById(userId: string): Promise<Owner> {
  const { data } = await nextServer.get<OwnerResponse>(`/users/${userId}`);
  console.log('getUserById', data.data);

  return data.data;
}

export async function getToolsByUserId(userId: string, page = 1, perPage = 8) {
  const { data } = await nextServer.get<UserToolsResponse>(
    `/users/${userId}/tools`,
    {
      params: { page, perPage },
    }
  );

  return data.data;
}
