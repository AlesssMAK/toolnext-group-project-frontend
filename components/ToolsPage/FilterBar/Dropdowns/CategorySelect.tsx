import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../FilterBar.module.css';
import FiltersDropdown from './FiltersDropdown';
import { getCategories } from '@/lib/api/clientApi';
import { Category } from '@/types/tool';
import { CustomClassName } from './type';

interface Props {
  selectedTags: string[];
  onSelect: (ids: string[]) => void;
  customClassName?: {
    [key in CustomClassName]?: string;
  };
}

export default function CategorySelect({
  selectedTags,
  onSelect,
  customClassName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
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
    if (selectedTags.length === 0) return 'Всі категорії';
    if (selectedTags.length === 1) {
      const found = categories.find(c => c._id === selectedTags[0]);
      return found?.title ?? 'Категорія';
    }
    return `Вибрано категорій: ${selectedTags.length}`;
  }, [selectedTags, categories]);

  const handleToggle = (id: string) => {
    if (selectedTags.includes(id)) {
      onSelect(selectedTags.filter(t => t !== id));
    } else {
      onSelect([...selectedTags, id]);
    }
  };

  const iconId = isOpen
          ? "keyboard_arrow_up"
          : "keyboard_arrow_down";

  return (
    <div
      ref={wrapperRef}
      className={`${styles.selectWrapper} ${
        isOpen ? styles.selectWrapperOpen : ''
      } ${styles.categorySelect} ${customClassName?.wrapper ?? ''}`}
    >
      <button
        type="button"
        className={`${styles.select} ${isOpen ? styles.selectOpen : ''}`}
        onClick={() => setIsOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.selectLabel}>{label}</span>

        <svg
          width="24"
          height="24"
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
          aria-hidden
        >
          <use href={`/sprite.svg#${iconId}`} />
        </svg>
      </button>

      {isOpen && categories.length > 0 && (
        <FiltersDropdown
          categories={categories}
          selectedTags={selectedTags}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
}
