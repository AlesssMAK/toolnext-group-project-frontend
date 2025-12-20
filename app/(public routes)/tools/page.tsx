import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import type { Metadata } from 'next';
import { getToolsWithPagination } from '@/lib/api/tools';
import ToolsPage from '@/components/ToolsPage/ToolsPage';

export const metadata: Metadata = {
  title: 'Всі інструменти - Оренда інструментів | ToolNext',
  description:
    'Великий каталог інструментів в оренду. Будівельні, садові, електроінструменти за доступними цінами.',
  keywords: [
    'оренда інструментів',
    'каталог інструментів',
    'прокат інструментів',
    'будівельні інструменти',
  ],
};

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['tools', { page: 1, limit: 16 }],
    queryFn: () => getToolsWithPagination(1, 16),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToolsPage />
    </HydrationBoundary>
  );
}
