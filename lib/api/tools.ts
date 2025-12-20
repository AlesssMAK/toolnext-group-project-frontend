import { Tool } from '@/types/tool';
import nextServer from './api';

export const getTools = async () => {
  const res = await nextServer.get('/tools');

  if (!res.data) {
    throw new Error('Failed to fetch tools');
  }

  return res.data.tools || [];
};

export const getToolsWithPagination = async (page: number, limit: number) => {
  const res = await nextServer.get(`/tools?page=${page}&limit=${limit}`);

  if (!res.data) {
    throw new Error('Failed to fetch tools');
  }

  return res.data;
};

export const getToolById = async (toolId: string): Promise<Tool> => {
  const res = await nextServer.get<Tool>(`/tools/${toolId}`);

  if (!res.data || !res.data._id) {
    throw new Error('Tool not found');
  }

  return res.data;
};
