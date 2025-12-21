'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import css from './ConfirmationModal.module.css';

type MaybePromise = void | Promise<void>;

export type ConfirmationModalProps = {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => MaybePromise;
  onCancel: () => void;
};

export default function ConfirmationModal({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [loading, onCancel]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (loading) return;
    if (e.target === e.currentTarget) onCancel();
  };

  const handleConfirm = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await Promise.resolve(onConfirm());
    } catch (err: any) {
      toast.error(err?.message || 'Сталася помилка. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const isDanger = /видал/i.test(confirmButtonText);

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.close}
          type="button"
          aria-label="Закрити"
          onClick={() => !loading && onCancel()}
        >
          ×
        </button>

        <h3 className={css.title}>{title}</h3>

        <div className={css.actions}>
          <button
            type="button"
            className={`${css.cancelBtn} button--secondary`}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelButtonText}
          </button>

          <button
            type="button"
            className={`${css.confirmBtn} button--primary ${isDanger ? css.danger : css.primary}`}
            onClick={handleConfirm}
            disabled={loading}
          >
            {confirmButtonText}
          </button>
        </div>

        {loading && (
          <div className={css.loaderWrap} aria-live="polite" aria-busy="true">
            <span className={css.loader} />
          </div>
        )}
      </div>
    </div>
  );
}
