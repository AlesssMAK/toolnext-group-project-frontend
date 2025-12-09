import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

interface FiltersPageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: FiltersPageProps): Promise<Metadata> => {
  const { slug } = await params;
  return {
    title: '',
    description: '',
    openGraph: {
      title: '',
      description: '',
      url: '',
      images: [
        {
          url: 'https://',
          width: 1200,
          height: 630,
          alt: 'ToolNext',
        },
      ],
      type: 'article',
    },
  };
};

const FiltersPage = async ({ params }: FiltersPageProps) => {
  const queryClient = new QueryClient();

  const debouncedSearch = '';
  const page = 1;

  const { slug } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['', debouncedSearch, page],
    queryFn: () => {},
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/*  */}
    </HydrationBoundary>
  );
};

export default FiltersPage;
