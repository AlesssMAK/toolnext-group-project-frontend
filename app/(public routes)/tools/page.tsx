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
  metadataBase: new URL('https://toolnext-group-project-frontend.vercel.app'),
  openGraph: {
    title: 'Всі інструменти - Оренда інструментів | ToolNext',
    description:
      'Великий каталог інструментів в оренду. Будівельні, садові, електроінструменти за доступними цінами.',
    url: 'https://toolnext-group-project-frontend.vercel.app',
    siteName: 'ToolNext',
    type: 'website',
  },
};

interface PageProps {
  searchParams: Promise<{
    search?: string;
    tag?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const queryClient = new QueryClient();
  const params = await searchParams;
  const search = params.search || '';

  await queryClient.prefetchQuery({
    queryKey: ['tools', { page: 1, limit: 16, search }],
    queryFn: () => getToolsWithPagination(1, 16, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToolsPage search={search} />
    </HydrationBoundary>
  );
}
