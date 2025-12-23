'use client';

import { useRouter } from 'next/navigation';
import AuthRequiredModal from '@/components/AuthRequiredModal/AuthRequiredModal';

export default function AuthRequestModalPage() {
  const router = useRouter();

  const close = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/');
  };

  return <AuthRequiredModal isOpen onClose={close} />;
}
