import styles from './BookingConfirmationPage.module.css';
import Link from 'next/link';

export default function BookingConfirmationPage() {
 

  return (
    <section className={`${styles.containerConfirmation} container`}>
      <h1 className={styles.title}>
        Інструмент успішно заброньовано
      </h1>

      <p className={styles.text}>
        Власник інструмента скоро з вами звʼяжеться стововно деталей та оплати вашої броні
      </p>

      <Link
        href="/"
        className={`${styles.btn} button button--primary`}
      >
        На головну
      </Link>
    </section>
  );
}
