'use client';

import styles from './FilterBar.module.css';
import CategorySelect from './Dropdowns/CategorySelect';
import PriceRangeInputs from './PriceFilters/PriceRangeInputs';
import SortDropdown from './Dropdowns/SortSelect';
import { SortOption } from './types';
import { useSearchParams } from 'next/navigation';

interface FilterBarProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  onResetSearch: () => void;
  minPrice?: number | null;
  maxPrice?: number | null;
  onMinPriceChange?: (value: number | null) => void;
  onMaxPriceChange?: (value: number | null) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function FilterBar({
  selectedTags,
  onTagsChange,
  onResetSearch,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const handleResetAll = () => {
    onTagsChange([]);
    onResetSearch();
    onMinPriceChange?.(null);
    onMaxPriceChange?.(null);
    onSortChange('popular');
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filtersGroup}>
        <CategorySelect selectedTags={selectedTags} onSelect={onTagsChange} />

        <PriceRangeInputs
          minPrice={minPrice ?? null}
          maxPrice={maxPrice ?? null}
          onMinChange={onMinPriceChange}
          onMaxChange={onMaxPriceChange}
        />
      </div>

      <div className={styles.sortGroup}>
        <button
          className={styles.resetBtn}
          type="button"
          onClick={handleResetAll}
          disabled={
            selectedTags.length === 0 &&
            minPrice == null &&
            maxPrice == null &&
            sort === 'popular' &&
            !searchQuery
          }
        >
          Скинути фільтри
        </button>

        <SortDropdown value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
