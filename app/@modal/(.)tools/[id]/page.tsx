import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

type ToolPreviewProps = {
  params: Promise<{ id: string }>;
};

const ModalPage = async ({ params }: ToolPreviewProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [],
    queryFn: () => {},
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/*  */}
    </HydrationBoundary>
  );
};

export default ModalPage;
