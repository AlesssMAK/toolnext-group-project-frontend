import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../FilterBar.module.css';
import FiltersDropdown from './FiltersDropdown';
import { CATEGORY_NAMES } from '../constants';

interface Props {
  selectedTag: string;
  onSelect: (id: string) => void;
}

export default function CategorySelect({ selectedTag, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocPointerDown = (e: PointerEvent) => {
      const el = wrapperRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', onDocPointerDown, true);
    return () =>
      document.removeEventListener('pointerdown', onDocPointerDown, true);
  }, []);

  const label = useMemo(() => {
    if (selectedTag && CATEGORY_NAMES[selectedTag])
      return CATEGORY_NAMES[selectedTag];
    return 'Всі категорії';
  }, [selectedTag]);

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.selectWrapper} ${isOpen ? styles.selectWrapperOpen : ''}`}
    >
      <button
        type="button"
        className={`${styles.select} ${styles.categorySelect}`}
        onClick={() => setIsOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.selectLabel}>{label}</span>
      </button>

      {isOpen && (
        <FiltersDropdown
          selectedTag={selectedTag}
          handleSelect={handleSelect}
          categoryNames={CATEGORY_NAMES}
        />
      )}
    </div>
  );
}
