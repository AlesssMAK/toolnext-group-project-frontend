'use client';

import { useParams, useRouter } from 'next/navigation';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal.client';
import { deleteTool } from '@/lib/api/clientApi';

export default function DeleteToolModal() {
  const router = useRouter();
  const { toolId } = useParams<{ toolId: string }>();

  const closeModal = () => {
    if (window.history.length > 1) router.back();
    else router.replace('/');
  };

  const handleConfirm = async () => {
    await deleteTool({ toolId });
    closeModal();
    window.location.href = '/profile';
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
