"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Tool } from "@/types/tool";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/tools`;

const MOBILE_LIMIT = 8;
const DESKTOP_LIMIT = 16;

function getLimitByViewport() {
  return window.innerWidth <= 767 ? MOBILE_LIMIT : DESKTOP_LIMIT;
}

function buildParams({
  page,
  limit,
  category,
}: {
  page: number;
  limit: number;
  category?: string | null;
}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (category) {
    params.set("categories", category);
  }

  return params.toString();
}

function extractToolsFromResponse(json: any): {
  tools: Tool[];
  totalPages: number;
} {
  const tools =
    Array.isArray(json.tools)
      ? json.tools
      : Array.isArray(json.data?.tools)
      ? json.data.tools
      : Array.isArray(json.data)
      ? json.data
      : [];

  const totalPages =
    json.totalPages ??
    json.data?.totalPages ??
    1;

  return { tools, totalPages };
}

export function useToolsPagination() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [tools, setTools] = useState<Tool[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLimit(getLimitByViewport());
  }, []);

  useEffect(() => {
    setPage(1);
    setTools([]);
  }, [category]);

  const fetchTools = useCallback(async () => {
    if (limit === null) return;

    setLoading(true);

    try {
      const query = buildParams({ page, limit, category });
      const res = await fetch(`${API_URL}?${query}`);

      if (!res.ok) {
        throw new Error("Failed to fetch tools");
      }

      const json = await res.json();
      const { tools: newTools, totalPages } =
        extractToolsFromResponse(json);

      setTools(prev =>
        page === 1 ? newTools : [...prev, ...newTools]
      );
      setTotalPages(totalPages);
    } catch (error) {
      console.error("useToolsPagination error:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, category]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  return {
    tools,
    loading,
    hasMore: page < totalPages,
    loadMore: () => setPage(p => p + 1),
  };
}
