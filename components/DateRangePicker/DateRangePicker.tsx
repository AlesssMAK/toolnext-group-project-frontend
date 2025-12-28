'use client';

import { useEffect, useRef } from 'react';
import AirDatepicker from 'air-datepicker';
import localeUk from 'air-datepicker/locale/uk';
import 'air-datepicker/air-datepicker.css';
import css from './DateRangePicker.module.css';

type BookedDateRange = {
  startDate: string;
  endDate: string;
};

type Props = {
  bookedDates: BookedDateRange[];
  onSelect: (from: Date | null, to: Date | null) => void;
};

function toISO(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, '0');
  const day = String(x.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function expandRangeToDays(startISO: string, endISO: string) {
  const [sy, sm, sd] = startISO.slice(0, 10).split('-').map(Number);
  const [ey, em, ed] = endISO.slice(0, 10).split('-').map(Number);

  const start = new Date(sy, sm - 1, sd);
  const end = new Date(ey, em - 1, ed);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const days: string[] = [];
  const cur = new Date(start);

  while (cur.getTime() <= end.getTime()) {
    days.push(toISO(cur));
    cur.setDate(cur.getDate() + 1);
  }

  return days;
}

export default function DateRangePicker({ bookedDates, onSelect }: Props) {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!calendarRef.current) return;
    const bookedSet = new Set(
      bookedDates.flatMap(r => expandRangeToDays(r.startDate, r.endDate))
    );

    const dp = new AirDatepicker(calendarRef.current, {
      inline: true,
      range: true,
      locale: localeUk,
      dateFormat: 'dd.MM.yyyy',
      minDate: new Date(),
      navTitles: {
        days: `
           <span class="dp-year">yyyy</span>
           <span class="dp-month">MMMM</span>
        `,
      },

      onRenderCell({ date, cellType }) {
        if (cellType !== 'day') return;

        if (bookedSet.has(toISO(date))) {
          return {
            disabled: true,
            classes: 'is-booked',
            attrs: { title: 'Цей день вже зайнятий' },
          };
        }
      },

      onSelect({ date }) {
        const from = Array.isArray(date) ? (date[0] ?? null) : null;
        const to = Array.isArray(date) ? (date[1] ?? null) : null;

        onSelect(from, to);
      },
    });

    return () => dp.destroy();
  }, [bookedDates]);

  return <div ref={calendarRef} className={css.calendar} />;
}
