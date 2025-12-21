'use client';

import styles from './FilterBar.module.css';
import CategorySelect from './Dropdowns/CategorySelect';
import PriceRangeInputs from './PriceFilters/PriceRangeInputs';
import SortDropdown from './Dropdowns/SortSelect';
import { SortOption } from './types';

interface FilterBarProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
  onResetSearch: () => void;
  minPrice?: number | null;
  maxPrice?: number | null;
  onMinPriceChange?: (value: number | null) => void;
  onMaxPriceChange?: (value: number | null) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function FilterBar({
  selectedTag,
  onTagChange,
  onResetSearch,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  const handleResetAll = () => {
    onTagChange('');
    onResetSearch();
    onMinPriceChange?.(null);
    onMaxPriceChange?.(null);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filtersGroup}>
        <CategorySelect selectedTag={selectedTag} onSelect={onTagChange} />
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
        >
          Скинути фільтри
        </button>
        <SortDropdown value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
