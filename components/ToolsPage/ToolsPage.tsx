'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import FilterBar from './FilterBar/FilterBar';
import ToolsGrid from './ToolsGrid/ToolsGrid';
import styles from './ToolsPage.module.css';
import { useToolsPagination } from '@/hooks/useToolsPagination';
import { Tool } from '@/types/tool';
import { SortOption } from './FilterBar/types';

function sortTools(tools: Tool[], sort: SortOption): Tool[] {
  const sorted = [...tools];
  switch (sort) {
    case 'priceAsc':
      return sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    case 'priceDesc':
      return sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    case 'nameAsc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'popular':
    default:
      return sorted.sort((a, b) => b.rating - a.rating);
  }
}

interface ToolsPageProps {
  search?: string;
}

interface ToolsFiltersState {
  search?: string;
  tags: string[];
  minPrice: number | null;
  maxPrice: number | null;
}

export default function ToolsPage({ search = '' }: ToolsPageProps) {
  const [filtersState, setFiltersState] = useState<ToolsFiltersState>({
    search,
    tags: [],
    minPrice: null,
    maxPrice: null,
  });

  const filters = useMemo(
    () => ({
      search: filtersState.search,
      tags: filtersState.tags,
      minPrice: filtersState.minPrice,
      maxPrice: filtersState.maxPrice,
    }),
    [
      filtersState.search,
      filtersState.tags,
      filtersState.minPrice,
      filtersState.maxPrice,
    ]
  );

  const { tools, loading, hasMore, loadMore } = useToolsPagination(filters);

  const [sort, setSort] = useState<SortOption>('popular');
  const [displayedTools, setDisplayedTools] = useState<Tool[]>([]);

  useEffect(() => {
    setDisplayedTools(prev => {
      if (prev.length === 0) {
        return sortTools(tools, sort);
      }

      const newItems = tools.slice(prev.length);
      return [...prev, ...newItems];
    });
  }, [tools]);

  useEffect(() => {
    setDisplayedTools(prev => sortTools(prev, sort));
  }, [sort]);

  const handleTagsChange = (tags: string[]) => {
    setDisplayedTools([]);
    setFiltersState(prev => ({ ...prev, tags }));
  };

  const handleMinPriceChange = (value: number | null) => {
    setDisplayedTools([]);
    setFiltersState(prev => ({ ...prev, minPrice: value }));
  };

  const handleMaxPriceChange = (value: number | null) => {
    setDisplayedTools([]);
    setFiltersState(prev => ({ ...prev, maxPrice: value }));
  };

  const handleSortChange = (option: SortOption) => {
    setSort(option);
  };

  const handleResetSearch = () => {
    setDisplayedTools([]);
    setFiltersState({
      search: '',
      tags: [],
      minPrice: null,
      maxPrice: null,
    });
  };

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Всі інструменти</h1>

      <FilterBar
        selectedTags={filtersState.tags}
        onTagsChange={handleTagsChange}
        onResetSearch={handleResetSearch}
        minPrice={filtersState.minPrice}
        maxPrice={filtersState.maxPrice}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        sort={sort}
        onSortChange={handleSortChange}
      />

      <ToolsGrid
        tools={displayedTools}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </section>
  );
}
