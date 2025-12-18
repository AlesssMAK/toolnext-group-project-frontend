'use client';

import { useRouter } from 'next/navigation';
import styles from './BookingConfirmationPage.module.css';

export default function BookingConfirmationPage() {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        Інструмент успішно заброньовано
      </h1>

      <p className={styles.text}>
        Власник інструмента скоро з вами звʼяжеться стововно деталей та оплати вашої броні
      </p>

      <button
        type="button"
        className={styles.button}
        onClick={() => router.push('/')}
      >
        На головну
      </button>
    </section>
  );
}
