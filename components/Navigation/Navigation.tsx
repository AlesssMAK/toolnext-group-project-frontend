'use client';

import css from './Navigation.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe, logout } from '@/lib/api/clientApi';
import PostListing from '../PostListing/PostListing';

type NavVariant = 'header' | 'burger';

type NavigationProps = {
  variant?: NavVariant;
  onItemClick?: () => void;
};

export const Navigation = ({
  variant = 'header',
  onItemClick,
}: NavigationProps) => {
  const router = useRouter();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const user = useAuthStore(s => s.user);
  const clearIsAuthenticated = useAuthStore(s => s.clearIsAuthenticated);

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    onItemClick?.();
    router.push('/');
  };

  console.log(user?.avatar);

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
              <div className={css.avatar}>D</div>
              <p className={css.username}>Дарія маковій</p>
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
            className={css.navigationLinkBtn}
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
