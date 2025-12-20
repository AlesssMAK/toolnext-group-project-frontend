'use client';

import { useParams, useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal.client';

export default function DeleteToolModal() {
  const router = useRouter();
  const { toolId } = useParams<{ toolId: string }>();

  const closeModal = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/');
  };

  const handleConfirm = async () => {
    const res = await fetch(`/api/tools/${toolId}`, { method: 'DELETE' });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || data?.message || 'Не вдалося видалити інструмент');
    }

    closeModal();
    setTimeout(() => router.refresh(), 0);
  };

  return (
    <ConfirmationModal
      title="Ви впевнені, що хочете видалити інструмент?"
      confirmButtonText="Видалити"
      cancelButtonText="Скасувати"
      onConfirm={handleConfirm}
      onCancel={closeModal}
    />
  );
}
