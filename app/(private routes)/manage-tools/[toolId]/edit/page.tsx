import AddEditToolForm from '@/components/AddEditToolForm/AddEditToolForm';
import { getToolById } from '@/lib/api/tools';
type PageEditToolProps = {
  params: Promise<{
    toolId: string;
  }>;
};

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Редагування інструменту | ToolNext',
  description: 'Сторінка редагування інформації про інструмент у сервісі ToolNext',
};

const EditToolsPage = async ({ params }: PageEditToolProps) => {
  const { toolId } = await params;
  const tool = await getToolById(toolId);
  if (!tool) {
    return <p>Інструмент не знайдено</p>;
  }
  const initialData = {
    id: toolId,
    name: tool.name || '',
    pricePerDay: tool.pricePerDay || '',
    category: tool.category || '',
    rentalTerms: tool.rentalTerms || '',
    description: tool.description || '',
    specifications: tool.specifications
      ? Object.entries(tool.specifications)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
      : '',
    photo: tool.images || '',
  };

  return (
    <section >
      <div className="container">
        <AddEditToolForm initialData={initialData} isEditMode={true} />
      </div>
    </section>
  );
};

export default EditToolsPage;
