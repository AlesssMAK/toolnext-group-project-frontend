'use client';

import { useEffect, useRef, useState } from 'react';
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

  // ===== Scroll lock =====
  const scrollYRef = useRef(0);
  const prevStylesRef = useRef({
    htmlOverflow: '',
    bodyOverflow: '',
    bodyPosition: '',
    bodyTop: '',
    bodyWidth: '',
    bodyPaddingRight: '',
  });

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    scrollYRef.current = window.scrollY;

    prevStylesRef.current = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    // щоб не було "стрибка" контенту
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollYRef.current}px`;
    body.style.width = '100%';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      const prev = prevStylesRef.current;

      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      body.style.paddingRight = prev.bodyPaddingRight;

      window.scrollTo(0, scrollYRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
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
            className={`${css.confirmBtn} button--primary ${
              isDanger ? css.danger : css.primary
            }`}
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
