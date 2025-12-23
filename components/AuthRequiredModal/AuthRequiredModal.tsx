'use client';

import { useRouter } from 'next/navigation';
import css from './AuthRequiredModal.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthRequiredModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const goTo = (path: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    onClose();

    setTimeout(() => {
      router.push(path);
    }, 0);
  };

  return (
    <Modal onClose={() => !isSubmitting && onClose()}>
      <div className={css.modal}>
        <h2 className={css.title}>Спочатку авторизуйтесь</h2>
        <p className={css.text}>
          Щоб забронювати інструмент, треба спочатку зареєструватись, або
          авторизуватись на платформі
        </p>

        <div className={css.actions}>
          <button
            type="button"
            className={css.login}
            onClick={() => goTo('/auth/login')}
            disabled={isSubmitting}
          >
            Вхід
          </button>

          <button
            type="button"
            className={css.register}
            onClick={() => goTo('/auth/register')}
            disabled={isSubmitting}
          >
            Реєстрація
          </button>
        </div>

        <button
          type="button"
          className={css.close}
          onClick={() => !isSubmitting && onClose()}
          aria-label="Закрити"
          disabled={isSubmitting}
        >
          <svg aria-hidden="true" className={css.closeIcon}>
            <use href="/sprite.svg#close" />
          </svg>
        </button>
      </div>
    </Modal>
  );
}
