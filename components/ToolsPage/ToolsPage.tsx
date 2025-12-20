'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FilterBar from './FilterBar/FilterBar';
import ToolsGrid from './ToolsGrid/ToolsGrid';
import styles from './ToolsPage.module.css';

import { useToolsPagination } from '@/hooks/useToolsPagination';

interface ToolsPageProps {
  search?: string;
}

export default function ToolsPage({ search = '' }: ToolsPageProps) {
  const [tag, setTag] = useState('');
  const [searchQuery, setSearchQuery] = useState(search);
  const router = useRouter();
  const { tools, loading, hasMore, loadMore } = useToolsPagination(
    searchQuery,
    tag
  );

  const handleResetSearch = () => {
    setSearchQuery('');
    router.push('/tools');
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Всі інструменти</h1>

      <FilterBar
        selectedTag={tag}
        onTagChange={setTag}
        onResetSearch={handleResetSearch}
      />

      <ToolsGrid
        tools={tools}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </section>
  );
}
