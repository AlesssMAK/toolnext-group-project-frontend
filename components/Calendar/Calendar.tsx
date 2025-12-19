import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from './Calendar.module.css';

interface CalendarProps {
  startDate: string;
  endDate: string;
  onChange: (range: { start: string; end: string }) => void;
  bookedDates?: string[];
}

const Calendar = ({ startDate, endDate, onChange, bookedDates = [] }: CalendarProps) => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const disabledDates = bookedDates.map(d => new Date(d));

     return (
         <div className="calendar"> 
             <DatePicker className={css.field}
                 selected={start}
                 onChange={(date: Date | null) => onChange({ start: date ? date.toISOString() : "", end: endDate })}
                 selectsStart
                 startDate={start}
                 endDate={end}
                 excludeDates={disabledDates}
                 highlightDates={disabledDates}
                 dateFormat={"dd.MM.yyyy"}
             />
             <DatePicker className={css.field}
                 selected={end}
                 onChange={(date: Date | null) => onChange({ start: startDate, end: date ? date.toISOString() : "" })}
                 selectsEnd 
                 startDate={start}
                 endDate={end}
                 minDate={start || undefined}
                 excludeDates={disabledDates}
                 highlightDates={disabledDates}
                 dateFormat="dd.MM.yyyy"
                 
             />
         </div>
     )
}

export default Calendar;