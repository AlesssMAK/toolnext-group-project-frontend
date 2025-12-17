'use client';

import styles from './ToolsGrid.module.css';
import { ToolCard } from '@/components/ToolCard/ToolCard';
import { Tool } from '@/types/tool';
import { useState } from 'react';
import { getUserToolsClient } from '@/lib/api/clientApi';
import { getTools } from '@/lib/api/tools';

interface Props {
  tools: Tool[];
  userId?: string;
  initialPage: number;
  totalPages: number;
  perPage: number;
  isOwner?: boolean;
}

export default function ToolsGrid({
  tools: initialTools,
  userId,
  initialPage,
  totalPages: initialTotalPages,
  perPage,
}: Props) {
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const hasMore = page < totalPages;

  const onLoadMore = async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      setError(false);
      const nextPage = page + 1;

      // ToolsGrid використовується у двох режимах:
      // - з userId: інструменти конкретного користувача
      // - без userId: всі інструменти  (сторінка інструментів)

      const response = userId
        ? await getUserToolsClient(userId, nextPage, perPage) // профіль
        : await getTools(); // сторінка інструментів

      const { tools: newTools, pagination } = response;
      setTools(prev => [...prev, ...newTools]);
      setPage(pagination.currentPage);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid_cover}`}>
        <div className={styles.grid}>
          {tools.map(tool => (
            <ToolCard key={tool._id} tool={tool} />
          ))}
        </div>

        {hasMore && (
          <button
            className={`${styles.loadMoreBtn} button button--primary`}
            onClick={onLoadMore}
            disabled={loading}
            type="button"
          >
            {loading ? 'Завантаження...' : 'Показати більше'}
          </button>
        )}
      </div>
    </section>
  );
}
