import { useState, useRef, useEffect } from 'react';
import styles from '../FilterBar.module.css';
import { SortOption } from '../types';
import { SORT_OPTIONS } from '../constants';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleToggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.selectWrapper + (isOpen ? ' ' + styles.selectWrapperOpen : '')} ref={wrapperRef}>
      <button
        type="button"
        className={styles.select}
        onClick={handleToggleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.selectLabel}>{SORT_OPTIONS[value]}</span>
      </button>
      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {Object.entries(SORT_OPTIONS).map(([key, label]) => (
            <li
              key={key}
              className={styles.option + (value === key ? ' ' + styles.optionSelected : '')}
              role="option"
              aria-selected={value === key}
              onClick={() => handleSelect(key as SortOption)}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}