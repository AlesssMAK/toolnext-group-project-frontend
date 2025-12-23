import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../FilterBar.module.css';
import FiltersDropdown from './FiltersDropdown';
import { getCategories } from '@/lib/api/clientApi';
import { Category } from '@/types/tool';

interface Props {
  selectedTag: string;
  onSelect: (id: string) => void;
}

export default function CategorySelect({ selectedTag, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const onDocPointerDown = (e: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', onDocPointerDown, true);
    return () =>
      document.removeEventListener('pointerdown', onDocPointerDown, true);
  }, []);

  const label = useMemo(() => {
    const found = categories.find(c => c._id === selectedTag);
    return found ? found.title : 'Всі категорії';
  }, [selectedTag, categories]);

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`${styles.selectWrapper} ${
        isOpen ? styles.selectWrapperOpen : ''
      }`}
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

      {isOpen && categories.length > 0 && (
        <FiltersDropdown
          selectedTag={selectedTag}
          handleSelect={handleSelect}
          categories={categories}
        />
      )}
    </div>
  );
}
