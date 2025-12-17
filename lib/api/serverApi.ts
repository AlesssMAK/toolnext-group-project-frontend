'use server';
import { cookies } from 'next/headers';
import nextServer from './api';
import { User } from '@/types/user';
import { UserResponse } from '@/types/user';
import { Tool, ToolsResponse, CategoriesResponse } from '@/types/tool'
import { Option } from '@/components/CategorySelect/CategorySelect';

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

export async function getTools(limit = 8): Promise<Tool[]> {
  const { data } = await nextServer.get<ToolsResponse>(`/tools?limit=${limit}`);
  return data.tools;
}

export async function getCategories(): Promise<Option[]> {
  const { data } = await nextServer.get<CategoriesResponse>("/categories");
  return data.data.map(cat => ({
    value: cat._id,
    label: cat.title,
  }));
}