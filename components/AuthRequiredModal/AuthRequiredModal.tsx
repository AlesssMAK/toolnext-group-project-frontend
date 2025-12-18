'use client';

import { useRouter } from 'next/navigation';
import css from './AuthRequiredModal.module.css';
import { useEffect } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthRequiredModal({ isOpen, onClose }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <h2 className={css.title}>Потрібна авторизація</h2>
        <p className={css.text}>
          Щоб забронювати інструмент, увійдіть або зареєструйтесь
        </p>

        <div className={css.actions}>
          <button
            className={css.login}
            onClick={() => router.push('/auth/login')}
          >
            Увійти
          </button>

          <button
            className={css.register}
            onClick={() => router.push('/auth/register')}
          >
            Реєстрація
          </button>
        </div>

        <button className={css.close} onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
