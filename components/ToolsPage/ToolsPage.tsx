'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FilterBar from './FilterBar/FilterBar';
import ToolsGrid from './ToolsGrid/ToolsGrid';
import styles from './ToolsPage.module.css';

import { useToolsPagination, ToolsFilter } from '@/hooks/useToolsPagination';
import { Tool } from '@/types/tool';
import { SortOption } from './FilterBar/types';

interface ToolsPageProps {
  search?: string;
}

function sortTools(tools: Tool[], sort: SortOption): Tool[] {
  const sorted = [...tools];
  if (sort === 'priceAsc') sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
  if (sort === 'priceDesc')
    sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
  if (sort === 'nameAsc') sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'nameDesc') sorted.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === 'popular') sorted.sort((a, b) => b.rating - a.rating);
  return sorted;
}

export default function ToolsPage({ search = '' }: ToolsPageProps) {
  const [filters, setFilters] = useState<ToolsFilter>({
    search,
    tag: '',
    minPrice: null,
    maxPrice: null,
  });
  const [sort, setSort] = useState<SortOption>('popular');
  const [sortedTools, setSortedTools] = useState<Tool[]>([]);
  const router = useRouter();
  const { tools, loading, hasMore, loadMore } = useToolsPagination(filters);

  useEffect(() => {
    setSortedTools(sortTools(tools, sort));
  }, [tools, sort]);

  const handleTagChange = (tag: string) => {
    setFilters(prev => ({ ...prev, tag }));
  };

  const handleResetSearch = () => {
    setFilters({});
    router.push('/tools');
  };

  const handleSortChange = (option: SortOption) => {
    setSort(option);
    setSortedTools(sortTools(tools, option));
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
        onSortChange={handleSortChange}
      />

      <ToolsGrid
        tools={sortedTools}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </section>
  );
}
