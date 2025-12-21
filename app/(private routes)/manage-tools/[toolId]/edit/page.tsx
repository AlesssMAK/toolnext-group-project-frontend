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
    name: tool.name || '',
    pricePerDay: tool.pricePerDay || '',
    category: tool.category || '',
    rentalTerms: tool.rentalTerms || '',
    description: tool.description || '',
    specifications: tool.specifications || '',
    photo: tool.images || '',
  };

  return (
    <section>
      <AddEditToolForm initialData={initialData} />
    </section>
  );
};

export default EditToolsPage;
