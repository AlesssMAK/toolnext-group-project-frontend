import { useEffect, useState } from 'react';
import styles from './PriceRangeInputs.module.css';
import {
  normalizePriceInput,
  toNullablePositiveInt,
  useDebouncedCallback,
} from './priceUtils';

interface Props {
  minPrice: number | null;
  maxPrice: number | null;
  onMinChange?: (v: number | null) => void;
  onMaxChange?: (v: number | null) => void;
}

export default function PriceRangeInputs({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: Props) {
  const [minStr, setMinStr] = useState(minPrice ? String(minPrice) : '');
  const [maxStr, setMaxStr] = useState(maxPrice ? String(maxPrice) : '');

  useEffect(() => {
    setMinStr(minPrice ? String(minPrice) : '');
  }, [minPrice]);
  useEffect(() => {
    setMaxStr(maxPrice ? String(maxPrice) : '');
  }, [maxPrice]);

  const debouncedMin = useDebouncedCallback(
    (v: number | null) => onMinChange?.(v),
    500
  );
  const debouncedMax = useDebouncedCallback(
    (v: number | null) => onMaxChange?.(v),
    500
  );

  return (
    <div className={styles.priceInputs}>
      <input
        type="text"
        name="minPrice"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Ціна від"
        value={minStr}
        onChange={e => {
          const next = normalizePriceInput(e.target.value);
          setMinStr(next);
          debouncedMin(toNullablePositiveInt(next));
        }}
      />

      <input
        type="text"
        name="maxPrice"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Ціна до"
        value={maxStr}
        onChange={e => {
          const next = normalizePriceInput(e.target.value);
          setMaxStr(next);
          debouncedMax(toNullablePositiveInt(next));
        }}
      />
    </div>
  );
}
