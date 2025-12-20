'use client';

import css from './Navigation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import PostListing from '../PostListing/PostListing';
import Image from 'next/image';

type NavVariant = 'header' | 'burger';

type NavigationProps = {
  variant?: NavVariant;
  onItemClick?: () => void;
};

export type PublicUser = {
  _id: string;
  name: string;
  avatar?: string;
};

export const Navigation = ({
  variant = 'header',
  onItemClick,
}: NavigationProps) => {
  const router = useRouter();
   const { user, isAuthenticated, loading } = useAuthStore();

  console.log('NAV STATE:', {
    loading,
    isAuthenticated,
    user,
  });

  if (loading) return null;

   const handleLogout = () => {
    onItemClick?.();        
    router.push('/confirm/logout');
  };

  const currentUser = user as PublicUser | null;
  const firstLetter = currentUser?.name?.charAt(0).toUpperCase();
  const avatarSrc = currentUser?.avatar?.trim() || '';
  const hasImage = avatarSrc.startsWith('http');

  return (
    <nav className={`${css.nav} ${css[variant]}`} aria-label="Main navigation">
      {isAuthenticated ? (
        <>
          <ul className={css.navList}>
            <li className={css.navigationItem}>
              <Link
                href="/"
                prefetch={false}
                className={css.navigationLink}
                onClick={onItemClick}
              >
                Головна
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                href="/tools"
                prefetch={false}
                className={css.navigationLink}
                onClick={onItemClick}
              >
                Інструменти
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                href="/profile"
                prefetch={false}
                className={css.navigationLink}
                onClick={onItemClick}
              >
                Мій профіль
              </Link>
            </li>
          </ul>

          <PostListing variant="menu" />

          <div className={css.userContainer}>
            <div className={css.userBox}>
              <div className={css.avatar}>
                {hasImage ? (
                  <Image
                    src={avatarSrc}
                    alt={`${currentUser?.name} avatar`}
                    width={32}
                    height={32}
                    className={css.avatarImg}
                    priority
                  />
                ) : (
                  <div className={css.avatarPlaceholder} aria-hidden="true">
                    {firstLetter}
                  </div>
                )}
              </div>
              <p className={css.username}>{currentUser?.name}</p>
            </div>
            <span className={css.divider} aria-hidden="true" />
            <button
              type="button"
              className={css.logoutBtn}
              onClick={handleLogout}
              aria-label="Logout"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/sprite.svg#logout"></use>
              </svg>
            </button>
          </div>
        </>
      ) : (
        <>
          <ul className={css.navList}>
            <li className={css.navigationItem}>
              <Link
                href="/"
                prefetch={false}
                className={css.navigationLink}
                onClick={onItemClick}
              >
                Головна
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                href="/tools"
                prefetch={false}
                className={css.navigationLink}
                onClick={onItemClick}
              >
                Інструменти
              </Link>
            </li>

            <li className={css.navigationItem}>
              <Link
                href="/auth/login"
                prefetch={false}
                className={css.navigationLink}
                onClick={onItemClick}
              >
                Увійти
              </Link>
            </li>
          </ul>

          <Link
            href="/auth/register"
            prefetch={false}
            className={`${css.navigationLinkBtn} button button--primary`}
            onClick={onItemClick}
          >
            Зареєструватися
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
