'use client';

import { useEffect, useRef } from 'react';
import AirDatepicker from 'air-datepicker';
import localeUk from 'air-datepicker/locale/uk';

type Props = {
  onSelect: (from: Date | null, to: Date | null) => void;
};

export default function DateRangePicker({ onSelect }: Props) {
  const fromRef = useRef<HTMLInputElement | null>(null);
  const toRef = useRef<HTMLInputElement | null>(null);

  const dpMinRef = useRef<AirDatepicker | null>(null);
  const dpMaxRef = useRef<AirDatepicker | null>(null);

  useEffect(() => {
    if (!fromRef.current || !toRef.current) return;

    dpMinRef.current = new AirDatepicker(fromRef.current, {
      locale: localeUk,
      dateFormat: 'dd.MM.yyyy',
      minDate: new Date(),

      onSelect({ date }) {
        const from = Array.isArray(date) ? (date[0] ?? null) : (date ?? null);

        // передаємо значення назовні
        onSelect(from, dpMaxRef.current?.selectedDates[0] ?? null);

        // обмежуємо мінімальну дату для "to"
        dpMaxRef.current?.update({
          minDate: from ?? undefined,
        });
      },
    });

    dpMaxRef.current = new AirDatepicker(toRef.current, {
      locale: localeUk,
      dateFormat: 'dd.MM.yyyy',
      minDate: new Date(),

      onSelect({ date }) {
        const to = Array.isArray(date) ? (date[0] ?? null) : (date ?? null);

        onSelect(dpMinRef.current?.selectedDates[0] ?? null, to);

        // обмежуємо максимальну дату для "from"
        dpMinRef.current?.update({
          maxDate: to ?? undefined,
        });
      },
    });

    return () => {
      dpMinRef.current?.destroy();
      dpMaxRef.current?.destroy();
    };
  }, []);

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <input ref={fromRef} readOnly placeholder="Початкова дата" />
      <input ref={toRef} readOnly placeholder="Кінцева дата" />
    </div>
  );
}
