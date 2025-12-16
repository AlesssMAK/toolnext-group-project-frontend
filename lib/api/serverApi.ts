'use server';
import { cookies } from 'next/headers';
import nextServer from './api';
import { User } from '@/types/user';
import { UserResponse } from '@/types/user';
import { Tool } from '@/types/tool'

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get('auth/refrech', {
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

export const getTools = async (): Promise<Tool[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tools?limit=8`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch tools");
  }

  const data = await res.json();
  return data.tools;
};