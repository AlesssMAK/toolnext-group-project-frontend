import dynamic from 'next/dynamic';

const AuthRequestModalPage = dynamic(
  () => import('@/app/@modal/(.)confirm/auth-request/page'),
  { ssr: false }
);

export default function Page() {
  return <AuthRequestModalPage />;
}

