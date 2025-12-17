'use client';

import { useState } from 'react';
import css from './HeaderClient.module.css';

import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import ModalBurger from '../ModalBurger/ModalBurger';
import PostListing from '../PostListing/PostListing';

export const HeaderClient = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <div className={css.burgerContainer}>
      <PostListing variant="tablet" />
      <button
        type="button"
        className={css.burgerButton}
        onClick={open}
        aria-label="Open menu"
        aria-expanded={isOpen}
      >
        <svg width="24" height="24" aria-hidden="true">
          <use href="/sprite.svg#menu"></use>
        </svg>
      </button>

      {isOpen && (
        <ModalBurger onClose={close}>
          <BurgerMenu onClose={close} />
        </ModalBurger>
      )}
    </div>
  );
};
