import BookingToolForm from '@/components/BookingToolForm/BookingToolForm';
import css from './BookingToolPage.module.css';
import { getToolById } from '@/lib/api/tools';

type PageProps = {
  params: Promise<{
    toolId: string;
  }>;
};

const BookingToolPage = async ({ params }: PageProps) => {
  const { toolId } = await params;
  const tool = await getToolById(toolId);

  return (
    <section className={css.containerConfirmation}>
      <BookingToolForm toolId={toolId} pricePerDay={tool.pricePerDay} />
    </section>
  );
};

export default BookingToolPage;
