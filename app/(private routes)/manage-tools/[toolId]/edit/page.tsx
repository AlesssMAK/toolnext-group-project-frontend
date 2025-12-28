import type { Metadata } from 'next';
import AddEditToolForm from '@/components/AddEditToolForm/AddEditToolForm';
import { getToolById } from '@/lib/api/tools';

export const metadata: Metadata = {
  title: 'Редагування інструменту | ToolNext',
  description:
    'Сторінка редагування інформації про інструмент у сервісі ToolNext',
};

type PageEditToolProps = {
  params: Promise<{
    toolId: string;
  }>;
};

const EditToolsPage = async ({ params }: PageEditToolProps) => {
  const { toolId } = await params;

  const tool = await getToolById(toolId);

  if (!tool) {
    return <p>Інструмент не знайдено</p>;
  }

  const specsObj =
    tool.specifications && typeof tool.specifications === 'object'
      ? tool.specifications
      : {};

  const initialData = {
    id: toolId,
    name: tool.name ?? '',
    pricePerDay: tool.pricePerDay ?? '',
    category: tool.category ?? '',
    rentalTerms: tool.rentalTerms ?? '',
    description: tool.description ?? '',
    specifications: Object.entries(specsObj)
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join('\n'),
    photo: tool.images?.[0] ?? '',
  };

  return (
    <section className="container">
      <AddEditToolForm initialData={initialData} isEditMode />
    </section>
  );
};

export default EditToolsPage;
