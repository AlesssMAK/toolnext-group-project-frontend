import type { Metadata } from 'next';
import BookingToolForm from '@/components/BookingToolForm/BookingToolForm';
import css from './BookingToolPage.module.css';
import { getToolById } from '@/lib/api/tools';

type PageProps = {
  params: {
    toolId: string;
  };
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const tool = await getToolById(params.toolId);

  return {
    title: `Бронювання: ${tool.name}`,
    description: `Забронюйте інструмент "${tool.name}" за ${tool.pricePerDay} грн на день.`,
  };
}

const BookingToolPage = async ({ params }: PageProps) => {
  const tool = await getToolById(params.toolId);

  return (
    <section className={css.containerConfirmation}>
      <BookingToolForm
        toolId={params.toolId}
        pricePerDay={tool.pricePerDay}
      />
    </section>
  );
};

export default BookingToolPage;

