import BookingToolForm from '@/components/BookingToolForm/BookingToolForm';
// import Link from 'next/link';
import styles from './BookingToolPage.module.css';

type Props = {
  toolId: string;
  pricePerDay: number;
};

const BookingToolPage = ({ toolId, pricePerDay }: Props) => {
  return (
    <section className={`${styles.containerConfirmation} container`}>
      <BookingToolForm toolId="692db3ffab59e437964311d4" pricePerDay={300} />
      {/* <BookingToolForm toolId={toolId} pricePerDay={pricePerDay} /> */}
    </section>
  );
};

export default BookingToolPage;
