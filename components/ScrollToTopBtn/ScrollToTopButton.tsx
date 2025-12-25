'use client';

import { useEffect, useState } from 'react';
import css from './ScrollToTopButton.module.css';

type Props = {
  showAfter?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export default function ScrollToTopButton({ showAfter = 400 }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollTop = window.scrollY || 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      const p = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const clampedP = clamp(p, 0, 1);

      setProgress(clampedP);
      setIsVisible(scrollTop > showAfter);

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    e.currentTarget.blur();
  };


  const MIN_SCALE = 0.48;
  const fillScale = MIN_SCALE + progress * (1 - MIN_SCALE);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${css.btn} ${isVisible ? css.show : ''}`}
      aria-label="Повернутись догори"
      title="Догори"
      style={{ ['--fillScale' as any]: fillScale.toString() }}
    >
      <svg width="24" height="24" className={css.icon} aria-hidden="true">
        <use href="/sprite.svg#arrow_back" />
      </svg>
    </button>
  );
}
