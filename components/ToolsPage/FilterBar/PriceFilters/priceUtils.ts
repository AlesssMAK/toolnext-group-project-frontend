import { useEffect, useRef } from 'react';

export function useDebouncedCallback<T extends any[]>(
  cb: (...args: T) => void,
  delay: number
) {
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (t.current) clearTimeout(t.current);
    },
    []
  );
  return (...args: T) => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => cb(...args), delay);
  };
}

export function normalizePriceInput(raw: string) {
  const digits = raw.replace(/[^\d]/g, '');
  if (digits === '') return '';
  if (digits[0] === '0') return '';
  return digits.replace(/^0+/, '');
}

export function toNullablePositiveInt(value: string) {
  if (value === '') return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  if (n <= 0) return null;
  return Math.trunc(n);
}
