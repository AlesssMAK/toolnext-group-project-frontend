'use client';

import { useEffect, useRef } from 'react';
import AirDatepicker from 'air-datepicker';
import localeUk from 'air-datepicker/locale/uk';
import css from './DateRangePicker.module.css';

type Props = {
  onSelect: (from: Date | null, to: Date | null) => void;
};
export default function DateRangePicker({ onSelect }: Props) {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    const dp = new AirDatepicker(calendarRef.current, {
      inline: true,
      range: true,
      locale: localeUk,
      dateFormat: 'dd.MM.yyyy',
      minDate: new Date(),

      onSelect({ date }) {
        const from = Array.isArray(date) ? (date[0] ?? null) : null;
        const to = Array.isArray(date) ? (date[1] ?? null) : null;

        onSelect(from, to);
      },
    });

    return () => dp.destroy();
  }, []);

  return <div ref={calendarRef} className={css.calendar} />;
}
