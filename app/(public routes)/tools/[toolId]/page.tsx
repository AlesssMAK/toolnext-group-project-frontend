import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { getToolById } from '@/lib/api/tools';

import ToolDetails from './ToolPreview.client';
import { getUserById } from '@/lib/api/serverApi';

interface ToolPageProps {
  params: Promise<{ toolId: string }>;
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
