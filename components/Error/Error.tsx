'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import css from './Error.module.css';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={css.errorPage}>
      <h1 className={css.title}>Щось пішло не так!</h1>
      <p className={css.message}>
        Вибачте. Сталася помилка під час обробки вашого запиту.
      </p>
      <div className={css.actions}>
        <button onClick={reset} className={css.button}>
          Спробувати знову
        </button>
        <Link href="/" className={css.link}>
          На головну
        </Link>
      </div>
    </div>
  );
}