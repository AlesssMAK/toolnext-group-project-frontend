import { Tool } from '@/types/tool';
import nextServer from './api';

export const getTools = async () => {
  const res = await fetch(
    'https://toolnext-group-project-backend.onrender.com/api/tools',
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch tools');
  }

  const data = await res.json();
  return data.tools || [];
};

export const getToolById = async (id: string): Promise<Tool> => {
  const res = await nextServer.get<Tool>(`/tools/${id}`);

  if (!res.data || !res.data._id) {
    throw new Error('Tool not found');
  }

  return res.data;
};
