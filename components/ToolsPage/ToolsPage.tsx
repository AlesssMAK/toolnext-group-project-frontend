'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FilterBar from './FilterBar/FilterBar';
import ToolsGrid from './ToolsGrid/ToolsGrid';
import styles from './ToolsPage.module.css';

import { useToolsPagination, ToolsFilter } from '@/hooks/useToolsPagination';
import { SortOption } from './FilterBar/types';

interface ToolsPageProps {
  search?: string;
}

export default function ToolsPage({ search = '' }: ToolsPageProps) {
  const [filters, setFilters] = useState<ToolsFilter>({
    search,
    tag: '',
    minPrice: null,
    maxPrice: null,
  });
  const [sort, setSort] = useState<SortOption>('popular');
  const router = useRouter();
  const { tools, loading, hasMore, loadMore } = useToolsPagination(filters);

  const handleTagChange = (tag: string) => {
    setFilters(prev => ({ ...prev, tag }));
  };

  const handleResetSearch = () => {
    setFilters({});
    router.push('/tools');
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Всі інструменти</h1>

      <FilterBar
        selectedTag={filters.tag || ''}
        onTagChange={handleTagChange}
        onResetSearch={handleResetSearch}
        minPrice={filters.minPrice || null}
        maxPrice={filters.maxPrice || null}
        onMinPriceChange={value =>
          setFilters(prev => ({ ...prev, minPrice: value }))
        }
        onMaxPriceChange={value =>
          setFilters(prev => ({ ...prev, maxPrice: value }))
        }
        sort={sort}
        onSortChange={setSort}
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
