import dynamic from 'next/dynamic';

const DeleteToolModalPage = dynamic(
  () => import('@/app/@modal/(.)confirm/delete-tool/[toolId]/page'),
  { ssr: false }
);

export default function Page() {
  return <DeleteToolModalPage />;
}
