import { useEffect, useState } from "react";
import { Tool } from "@/types/tool";

const API_URL =
  "https://toolnext-group-project-backend.onrender.com/api/tools";

export function useToolsPagination() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLimit(window.innerWidth <= 767 ? 8 : 16);
  }, []);

  useEffect(() => {
    if (limit === null) return;

    async function fetchTools() {
      setLoading(true);

      const res = await fetch(
        `${API_URL}?page=${page}&limit=${limit}`
      );
      const data = await res.json();

      setTools(prev =>
        page === 1 ? data.tools : [...prev, ...data.tools]
      );
      setTotalPages(data.totalPages);
      setLoading(false);
    }

    fetchTools();
  }, [page, limit]);

  return {
    tools,
    loading,
    hasMore: page < totalPages,
    loadMore: () => setPage(p => p + 1),
  };
}
