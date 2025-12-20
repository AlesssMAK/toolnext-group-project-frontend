import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Tool } from '@/types/tool';
import nextServer from '@/lib/api/api';

export function useToolsPagination(search: string = '', tag: string = '') {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | null>(null);
  const [allTools, setAllTools] = useState<Tool[]>([]);

  useEffect(() => {
    setLimit(window.innerWidth <= 767 ? 8 : 16);
  }, []);

  useEffect(() => {
    setPage(1);
    setAllTools([]);
  }, [search, tag]);

  const { data, isLoading } = useQuery({
    queryKey: ['tools', { page, limit, search, tag }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit!.toString());
      if (search) params.append('search', search);
      if (tag) params.append('categories', tag);

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
  };
}
