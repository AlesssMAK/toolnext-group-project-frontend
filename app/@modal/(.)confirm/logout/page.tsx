'use client';

import { useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal.client';
import { logout } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function LogoutModal() {
  const router = useRouter();
  const { clearIsAuthenticated } = useAuthStore();

  const closeModal = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/');
  };

  const handleConfirm = async () => {
    await logout();
    clearIsAuthenticated();

    closeModal();
    setTimeout(() => router.refresh(), 0);
  };

  return (
    <ConfirmationModal
      title="Ви впевнені, що хочете вийти?"
      confirmButtonText="Вийти"
      cancelButtonText="Залишитись"
      onConfirm={handleConfirm}
      onCancel={closeModal}
    />
  );
}
