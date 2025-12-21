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

  const handleLogin = () => {
    setIsSubmitting(true);
    onClose();
    router.push('/auth/login');
  };

  const handleRegister = () => {
    setIsSubmitting(true);
    onClose();
    router.push('/auth/register');
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.modal}>
        <h2 className={css.title}>Спочатку авторизуйтесь</h2>
        <p className={css.text}>
          Щоб забрронювати інструмент, треба спочатку зареєструватись, або
          авторизуватись на платформі
        </p>

        <div className={css.actions}>
          <button
            className={css.login}
            onClick={handleLogin}
            disabled={isSubmitting}
          >
            Вхід
          </button>

          <button
            className={css.register}
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            Реєстрація
          </button>
        </div>

        <button className={css.close} onClick={onClose}>
          <svg aria-hidden="true" className={css.closeIcon}>
            <use href="/sprite.svg#close" />
          </svg>
        </button>
      </div>
    </Modal>
  );
}
