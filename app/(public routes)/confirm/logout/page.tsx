'use client';

import dynamic from 'next/dynamic';

const LogoutModalPage = dynamic(
  () => import('@/app/@modal/(.)confirm/logout/page'),
  { ssr: false }
);

export default function Page() {
  return <LogoutModalPage />;
}
