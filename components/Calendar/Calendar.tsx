'use client';

import { useState } from 'react';
import css from './Calendar.module.css';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
const months = [
  'Січень','Лютий','Березень','Квітень','Травень','Червень',
  'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'
];

type Props = {
  onSelect?: (from: Date | null, to: Date | null) => void;
};

export default function CustomCalendar({ onSelect }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [range, setRange] = useState<{from: Date|null, to: Date|null}>({from:null, to:null});

  const firstDay = new Date(year, month, 1);
  const startDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const cells: (number|null)[] = [];
  for (let i=0; i<startDay; i++) cells.push(null);
  for (let d=1; d<=daysInMonth; d++) cells.push(d);

  const handleClick = (day: number|null) => {
    if (!day) return;
    const date = new Date(year, month, day);
    if (!range.from || (range.from && range.to)) {
      setRange({from: date, to: null});
      onSelect?.(date, null);
    } else {
      const from = range.from;
      const to = date >= from ? date : from;
      const newFrom = date >= from ? from : date;
      setRange({from: newFrom, to});
      onSelect?.(newFrom, to);
    }
    };
    
    const isToday = (day: number|null) => {
  if (!day) return false;
  const date = new Date(year, month, day);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

  const isSelected = (day: number|null) => {
    if (!day) return false;
    const date = new Date(year, month, day);
    if (range.from && !range.to) return date.getTime() === range.from.getTime();
    if (range.from && range.to) {
      return date >= range.from && date <= range.to;
    }
    return false;
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  return (
      <div className={css.calendar}>
          <label className={css.labels}>Виберіть період бронювання</label>
      <div className={css.header}>
  <span className={css.year}>{year}</span>
  <div className={css.monthNav}>
                  <button onClick={prevMonth} className={css.navBtn}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.23703 8.00058L11.4392 13.2027C11.572 13.3383 11.639 13.5077 11.6404 13.7109C11.6417 13.9141 11.5746 14.0891 11.4392 14.2357C11.2925 14.3797 11.1176 14.4517 10.9144 14.4517C10.7111 14.4517 10.5375 14.3797 10.3935 14.2357L4.95403 8.79625C4.84069 8.68292 4.75853 8.55719 4.70753 8.41908C4.65642 8.28086 4.63086 8.14136 4.63086 8.00058C4.63086 7.8598 4.65642 7.72031 4.70753 7.58208C4.75853 7.44397 4.84069 7.31825 4.95403 7.20492L10.4102 1.75275C10.5542 1.60608 10.7244 1.53492 10.9207 1.53925C11.117 1.54347 11.2899 1.61886 11.4392 1.76542C11.572 1.91208 11.6411 2.08425 11.6467 2.28192C11.6522 2.47958 11.5831 2.65175 11.4392 2.79842L6.23703 8.00058Z" fill="black" />
</svg>
    </button>
    <span className={css.month}>{months[month]}</span>
    <button onClick={nextMonth} className={css.navBtn}>→</button>
  </div>
</div>
      <div className={css.grid}>
        {daysOfWeek.map(d => (
          <div key={d} className={css.dayName}>{d}</div>
        ))}
        {cells.map((day, i) => (
            <div
                key={i}
                className={`${css.dayCell} ${day ? '' : css.inactive} ${isSelected(day) ? css.selected : ''} ${isToday(day) ? css.today : ''}`}
                onClick={() => handleClick(day)}   
            >  
                {day ?? ''}
            </div>
        ))}
      </div>
    </div>
  );
}

// запасний варіант

{/* <Calendar
                    onSelect={(from, to) => {
                setFieldValue('startDate', from);
                setFieldValue('endDate', to);
              }}
                  />
                  {serverWarning && (
                    <ErrorMessage
                    className={`${css.error_message} text-red-600 text-sm`}
                      name="startDate" component="p" />
                  )} */}