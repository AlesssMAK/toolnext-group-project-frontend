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
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  type Cell = { day: number; offsetMonth: -1 | 0 | 1 };
  const cells: Cell[] = [];

  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, offsetMonth: - 1 });
  };
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, offsetMonth: 0 });
  };
 let nextDay = 1;
while (cells.length < 35) {
  cells.push({ day: nextDay++, offsetMonth: 1 });
}
  
  const getCellDate = (cell: Cell) => new Date(year, month + cell.offsetMonth, cell.day);
 
  const handleClick = (cell: Cell) => {
    const date = getCellDate(cell);
    if (!range.from || (range.from && range.to)) {
      setRange({ from: date, to: null });
      onSelect?.(date, null);
    } else {
      const from = range.from;
      const to = date >= from ? date : from;
      const newFrom = date >= from ? from : date;
      setRange({ from: newFrom, to });
      onSelect?.(newFrom, to);
    }
  };
    
  const isToday = (cell: Cell) => {
    const date = getCellDate(cell);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
    };

  const isSelected = (cell: Cell): boolean => {
    const date = getCellDate(cell);
    if (range.from && !range.to) {return date.getTime() === range.from.getTime();}
    if (range.from && range.to) {return date >= range.from && date <= range.to;}
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
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-scheme-1-text)" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.23703 8.00058L11.4392 13.2027C11.572 13.3383 11.639 13.5077 11.6404 13.7109C11.6417 13.9141 11.5746 14.0891 11.4392 14.2357C11.2925 14.3797 11.1176 14.4517 10.9144 14.4517C10.7111 14.4517 10.5375 14.3797 10.3935 14.2357L4.95403 8.79625C4.84069 8.68292 4.75853 8.55719 4.70753 8.41908C4.65642 8.28086 4.63086 8.14136 4.63086 8.00058C4.63086 7.8598 4.65642 7.72031 4.70753 7.58208C4.75853 7.44397 4.84069 7.31825 4.95403 7.20492L10.4102 1.75275C10.5542 1.60608 10.7244 1.53492 10.9207 1.53925C11.117 1.54347 11.2899 1.61886 11.4392 1.76542C11.572 1.91208 11.6411 2.08425 11.6467 2.28192C11.6522 2.47958 11.5831 2.65175 11.4392 2.79842L6.23703 8.00058Z" fill="black" />
</svg>
    </button>
    <span className={css.month}>{months[month]}</span>
          <button onClick={nextMonth} className={css.navBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-scheme-1-text)" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.75398 7.9667L4.55181 2.76453C4.41626 2.62898 4.34787 2.46025 4.34665 2.25836C4.34531 2.05648 4.41237 1.88353 4.54781 1.73953C4.69448 1.59286 4.86943 1.51953 5.07265 1.51953C5.27587 1.51953 5.44948 1.59286 5.59348 1.73953L11.033 7.17103C11.1463 7.28436 11.2285 7.41009 11.2795 7.5482C11.3306 7.68642 11.3561 7.82592 11.3561 7.9667C11.3561 8.10748 11.3306 8.24698 11.2795 8.3852C11.2285 8.52331 11.1463 8.64903 11.033 8.76236L5.58081 14.2145C5.43415 14.3612 5.26265 14.4318 5.06631 14.4262C4.86998 14.4206 4.69848 14.3445 4.55181 14.1979C4.41626 14.0512 4.3457 13.8797 4.34015 13.6834C4.33459 13.487 4.40515 13.3155 4.55181 13.1689L9.75398 7.9667Z" fill="black" />
</svg>
    </button>
  </div>
</div>
      <div className={css.grid}>
        {daysOfWeek.map(d => (
          <div key={d} className={css.dayName}>{d}</div>
        ))}
        {cells.map((cell, i) => (
  <div
    key={i}
    className={`
      ${css.dayCell}
      ${cell.offsetMonth === 0 ? '' : css.inactive}
      ${isSelected(cell) ? css.selected : ''}
      ${isToday(cell) ? css.today : ''}
    `}
    onClick={() => handleClick(cell)}
  >
    {cell.day}
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