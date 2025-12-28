'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createFeedback } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './FeedbackFormModal.module.css';

interface FeedbackFormModalProps {
  onClose: () => void;
  onSubmit: (data: { description: string; rate: number }) => void;
  toolId: string;
}

const FeedbackFormModal = ({
  onClose,
  onSubmit,
  toolId,
}: FeedbackFormModalProps) => {
  const user = useAuthStore(state => state.user);

  const [description, setReview] = useState('');
  const [rate, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const queryClient = useQueryClient();

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex + 1);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const createFeedbackMutate = useMutation({
    mutationFn: (data: {
      description: string;
      rate: number;
      toolId: string;
    }) => createFeedback(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      onSubmit({ description, rate });
      onClose();
    },
    onError(error: any) {
      toast.error(error.message || 'Помилка при надсиланні відгуку');
    },
  });

  const handleSubmit = () => {
    if (!rate) {
      toast.error('Оберіть оцінку');
      return;
    }

    createFeedbackMutate.mutate({
      description,
      rate,
      toolId,
    });
  };

  return (
    <div className={styles.modal}>
      <button className={styles.closeButton} onClick={onClose}>
        <svg className={styles.closeIcon}>
          <use href="/sprite.svg#close"></use>
        </svg>
      </button>

      <h2 className={styles.title}>Залишити відгук на товар</h2>

      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* NAME (AUTOFILL, DISABLED) */}
        <div className={styles.field}>
          <label className={styles.label}>Імʼя</label>
          <input
            type="text"
            value={user?.name || ''}
            className={styles.input}
            disabled
          />
        </div>

        {/* DESCRIPTION */}
        <div className={styles.field}>
          <label className={styles.label}>Відгук</label>
          <textarea
            value={description}
            onChange={e => setReview(e.target.value)}
            className={styles.textarea}
            placeholder="Ваш відгук"
            rows={4}
            required
          />
        </div>

        {/* RATING */}
        <div className={styles.field}>
          <label className={styles.label}>Оцінка</label>
          <div className={styles.starRating}>
            {Array.from({ length: 5 }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.star} ${
                  index < rate || index < hoverRating
                    ? styles.selected
                    : ''
                }`}
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={handleStarLeave}
              >
                <svg className={styles.starIcon}>
                  <use href="/sprite.svg#star"></use>
                </svg>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Надіслати
        </button>
      </form>
    </div>
  );
};

export default FeedbackFormModal;
