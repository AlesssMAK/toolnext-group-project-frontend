import { Tool } from '@/types/tool';
import nextServer from './api';

export const getTools = async () => {
  const res = await nextServer.get('/tools');

  if (!res.data) {
    throw new Error('Failed to fetch tools');
  }

  return res.data.tools || [];
};

export const getToolsWithPagination = async (
  page: number,
  limit: number,
  search?: string,
  tag?: string,
  minPrice?: number | null,
  maxPrice?: number | null,
  sort?: string
) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search ? { search } : {}),
    ...(tag ? { categories: tag } : {}),
    ...(minPrice != null ? { minPrice: String(minPrice) } : {}),
    ...(maxPrice != null ? { maxPrice: String(maxPrice) } : {}),
    ...(sort ? { sort } : {}),
  });

  const res = await nextServer.get(`/tools?${params.toString()}`);

  if (!res.data) throw new Error('Failed to fetch tools');

  return res.data;
};

export const getToolById = async (toolId: string): Promise<Tool> => {
  const res = await nextServer.get<Tool>(`/tools/${toolId}`);

  if (!res.data || !res.data._id) {
    throw new Error('Tool not found');
  }

  return res.data;
};
