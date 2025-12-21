'use client';

import DateRangePicker from '@/components/DateRangePicker/DateRangePicker';
import { useState } from 'react';

export default function TestPage() {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  return (
    <div style={{ padding: 40 }}>
      <h1>Test DatePicker</h1>

      <DateRangePicker
        onSelect={(fromDate, toDate) => {
          setFrom(fromDate);
          setTo(toDate);
        }}
      />
    </div>
  );
}
