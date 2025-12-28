import type { Metadata } from 'next';
import BookingToolForm from '@/components/BookingToolForm/BookingToolForm';
import css from './BookingToolPage.module.css';
import { getToolById } from '@/lib/api/tools';

type PageProps = {
  params: Promise<{
    toolId: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { toolId } = await params;

  const tool = await getToolById(toolId);

  return {
    title: `Бронювання: ${tool.name}`,
    description: `Забронюйте інструмент "${tool.name}" за ${tool.pricePerDay} грн на день.`,
  };
}

const BookingToolPage = async ({ params }: PageProps) => {
  const { toolId } = await params;

  const tool = await getToolById(toolId);

  return (
    <section className={css.containerConfirmation}>
      <BookingToolForm
        toolId={toolId}
        pricePerDay={tool.pricePerDay}
        bookedDates={tool.bookedDates}
      />
    </section>
  );
};

export default BookingToolPage;
