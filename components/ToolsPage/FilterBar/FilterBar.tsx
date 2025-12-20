'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
  onResetSearch: () => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  '6704d9c7f1a3b8c2d5e4f6a0': 'Перфоратори, відбійні молотки та штроборізи',
  '6704d9c7f1a3b8c2d5e4f6a1': 'Дрилі, шуруповерти та гайковерти',
  '6704d9c7f1a3b8c2d5e4f6a2': 'Шліфмашини, болгарки та полірувальні машини',
  '6704d9c7f1a3b8c2d5e4f6a3': 'Пилки, лобзики та торцювальні пилки',
  '6704d9c7f1a3b8c2d5e4f6a4':
    'Плиткорізи та інструмент для роботи з керамогранітом',
  '6704d9c7f1a3b8c2d5e4f6a5': 'Зварювальне обладнання, паяльники та термофени',
  '6704d9c7f1a3b8c2d5e4f6a6': 'Компресори, пневмоінструмент та фарбопульти',
  '6704d9c7f1a3b8c2d5e4f6a7': 'Пилососи, стружкоотсоси та системи прибирання',
  '6704d9c7f1a3b8c2d5e4f6a8':
    'Мийки високого тиску, генератори та будівельна техніка',
  '6704d9c7f1a3b8c2d5e4f6a9':
    'Лазерні нівеліри, далекоміри та вимірювальні прилади',
};

export default function FilterBar({
  selectedTag,
  onTagChange,
  onResetSearch,
}: FilterBarProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleToggleOpen = () => {
    setIsSelectOpen(prev => !prev);
  };

  const handleSelect = (value: string) => {
    onTagChange(value);
    setIsSelectOpen(false);
  };

  const handleReset = () => {
    onTagChange('');
    onResetSearch();
    setIsSelectOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedLabel =
    selectedTag && CATEGORY_NAMES[selectedTag]
      ? CATEGORY_NAMES[selectedTag]
      : 'Всі категорії';

  return (
    <div className={styles.filterBar}>
      <div
        ref={wrapperRef}
        className={`${styles.selectWrapper} ${isSelectOpen ? styles.selectWrapperOpen : ''}`}
      >
        <button
          type="button"
          className={styles.select}
          onClick={handleToggleOpen}
          aria-haspopup="listbox"
          aria-expanded={isSelectOpen}
        >
          <span className={styles.selectLabel}>{selectedLabel}</span>
        </button>

        {isSelectOpen && (
          <ul className={styles.dropdown} role="listbox">
            <li
              className={`${styles.option} ${!selectedTag ? styles.optionSelected : ''}`}
              role="option"
              aria-selected={!selectedTag}
              onClick={() => handleSelect('')}
            >
              Всі категорії
            </li>
            {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
              <li
                key={key}
                className={`${styles.option} ${selectedTag === key ? styles.optionSelected : ''}`}
                role="option"
                aria-selected={selectedTag === key}
                onClick={() => handleSelect(key)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className={styles.resetBtn} onClick={handleReset}>
        Скинути фільтри
      </button>
    </div>
  );
}
