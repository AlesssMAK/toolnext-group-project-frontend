'use client';

import css from './BurgerMenu.module.css';
import { Navigation } from '../Navigation/Navigation';

type Props = {
  onClose: () => void;
};

export const BurgerMenu = ({ onClose }: Props) => {
  return (
    <div className={`${css.menu} container`}>
      <div className={css.top}>
        <a href="/" className={css.logo}>
          <svg width="83" height="15" viewBox="0 0 177 32" aria-hidden="true">
            <use href="/sprite.svg#icon-logo" />
          </svg>
        </a>
        <button onClick={onClose} className={css.closeMenuBurger}>
          <svg width="24" height="24" aria-hidden="true">
            <use href="/sprite.svg#close" />
          </svg>
        </button>
      </div>

      <Navigation variant="burger" onItemClick={onClose} />
    </div>
  );
};
