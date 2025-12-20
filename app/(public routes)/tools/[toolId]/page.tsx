import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import { getToolById } from '@/lib/api/tools';

import ToolDetails from './ToolPreview.client';
import { getUserById } from '@/lib/api/serverApi';

interface ToolPageProps {
  params: Promise<{ toolId: string }>;
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { toolId } = await params;

  try {
    const tool = await getToolById(toolId);

    return {
      title: `${tool.name} - Оренда інструментів`,
      description: tool.description || `Орендуйте ${tool.name} від ${tool.pricePerDay} грн/день. Якісний інструмент для ваших проектів.`,
      keywords: [tool.name, 'оренда інструментів', 'прокат інструментів', tool.category].filter(Boolean),
      openGraph: {
        title: `${tool.name} - Оренда інструментів`,
        description: tool.description || `Орендуйте ${tool.name} від ${tool.pricePerDay} грн/день`,
        images: [tool.images],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${tool.name} - Оренда інструментів`,
        description: tool.description || `Орендуйте ${tool.name} від ${tool.pricePerDay} грн/день`,
        images: [tool.images],
      },
    };
  } catch (error) {
    return {
      title: 'Інструмент не знайдено',
      description: 'Сторінка інструмента не знайдена',
    };
  }
}

const ToolPage = async ({ params }: ToolPageProps) => {
  const { toolId } = await params;
  const queryClient = new QueryClient();

  const tool = await queryClient.fetchQuery({
    queryKey: ['tool', toolId],
    queryFn: () => getToolById(toolId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['user', tool.owner],
    queryFn: () => getUserById(tool.owner),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToolDetails />
    </HydrationBoundary>
  );
};

export default ToolPage;
