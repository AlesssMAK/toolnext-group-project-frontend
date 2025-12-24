import AddEditToolForm from '@/components/AddEditToolForm/AddEditToolForm';
import { getToolById } from '@/lib/api/tools';
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
    <section className="container">
      <AddEditToolForm initialData={initialData} isEditMode={true} />
    </section>
  );
};

export default EditToolsPage;
