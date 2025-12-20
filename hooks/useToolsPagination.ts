import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Tool } from '@/types/tool';
import nextServer from '@/lib/api/api';

export function useToolsPagination() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number | null>(null);
  const [allTools, setAllTools] = useState<Tool[]>([]);

  useEffect(() => {
    setLimit(window.innerWidth <= 767 ? 8 : 16);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['tools', { page, limit }],
    queryFn: async () => {
      const res = await nextServer.get(`/tools?page=${page}&limit=${limit}`);
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
