import BookingToolForm from '@/components/BookingToolForm/BookingToolForm';
import Link from 'next/link';
import styles from './BookingToolPage.module.css';

type Props = {
  toolId: string;
  pricePerDay: number;
};

const BookingToolPage = ({ toolId, pricePerDay }: Props) => {
  return (
    <section className={`${styles.containerConfirmation} container`}>
      <BookingToolForm toolId={toolId} pricePerDay={pricePerDay} />
      <Link href="/" className={`${styles.btn} button button--primary`}>
        На головну
      </Link>
    </section>
  );
};

export default BookingToolPage;
