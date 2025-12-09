'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1>Щось пішло не так!</h1>
      <p>Вибачте. Сталася помилка під час обробки вашого запиту.</p>
      <div>
        <button onClick={reset}>Спробувати знову</button>
        <Link href="/">На головну</Link>
      </div>
    </div>
  );
}
