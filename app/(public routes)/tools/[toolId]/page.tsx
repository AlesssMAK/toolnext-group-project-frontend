import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import { getToolById } from '@/lib/api/tools';
import ToolDetails from './ToolPreview.client';

interface ToolPageProps {
  params: Promise<{ toolId: string }>;
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const { toolId } = await params;

  try {
    const tool = await getToolById(toolId);
    const images = Array.isArray(tool.images) ? tool.images : [tool.images];

    return {
      title: `${tool.name} - Оренда інструментів`,
      description:
        tool.description ||
        `Орендуйте ${tool.name} від ${tool.pricePerDay} грн/день. Якісний інструмент для ваших проектів.`,
      keywords: [
        tool.name,
        'оренда інструментів',
        'прокат інструментів',
        tool.category,
      ].filter(Boolean),
      openGraph: {
        title: `${tool.name} - Оренда інструментів`,
        description:
          tool.description ||
          `Орендуйте ${tool.name} від ${tool.pricePerDay} грн/день`,
        images,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${tool.name} - Оренда інструментів`,
        description:
          tool.description ||
          `Орендуйте ${tool.name} від ${tool.pricePerDay} грн/день`,
        images,
      },
    };
  } catch {
    return {
      title: 'Інструмент не знайдено',
      description: 'Сторінка інструмента не знайдена',
    };
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { toolId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tool', toolId],
    queryFn: () => getToolById(toolId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToolDetails />
    </HydrationBoundary>
  );
}
