import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tool } from '@/types/tool';
import nextServer from '@/lib/api/api';

export interface ToolsFilter {
  search?: string;
  tag?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export function useToolsPagination(filters: ToolsFilter = {}) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | null>(null);
  const [allTools, setAllTools] = useState<Tool[]>([]);

  useEffect(() => {
    setLimit(window.innerWidth <= 767 ? 8 : 16);
  }, []);

  useEffect(() => {
    setPage(1);
    setAllTools([]);
  }, [filters.search, filters.tag, filters.minPrice, filters.maxPrice]);

  const { data, isLoading } = useQuery({
    queryKey: ['tools', { page, limit, ...filters }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit!.toString());
      if (filters.search) params.append('search', filters.search);
      if (filters.tag) params.append('categories', filters.tag);
      if (filters.minPrice)
        params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice)
        params.append('maxPrice', filters.maxPrice.toString());

      const res = await nextServer.get(`/tools?${params.toString()}`);
      return res.data;
    },
    enabled: limit !== null,
  });

  useEffect(() => {
    if (data?.tools) {
      setAllTools(prev => (page === 1 ? data.tools : [...prev, ...data.tools]));
    }
  }, [data, page]);

  return {
    tools: allTools,
    loading: isLoading,
    hasMore: page < (data?.totalPages || 1),
    loadMore: () => setPage(p => p + 1),
    setPage,
  };
}
