'use client';

import Link from 'next/link';
import css from './Footer.module.css';
import { useAuthStore } from '@/lib/store/authStore';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) return null;

  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.footer_container}>
          <Link href="/" aria-label="На головну" className={css.logo}>
            <svg className={css.logo_icon} aria-hidden="true">
              <use href="/sprite.svg#AlternateFalse"></use>
            </svg>
          </Link>

          <nav aria-label="Footer navigation">
            <ul className={css.nav_list}>
              <li className={css.nav_list_item}>
                <Link className={css.nav_list_link} href="/">
                  Головна
                </Link>
              </li>

              <li className={css.nav_list_item}>
                <Link className={css.nav_list_link} href="/tools">
                  Інструменти
                </Link>
              </li>

              {isAuthenticated ? (
                <>
                  <li className={css.nav_list_item}>
                    <Link className={css.nav_list_link} href="/profile">
                      Мій профіль
                    </Link>
                  </li>

                  <li className={css.nav_list_item}>
                    <Link
                      className={`${css.nav_list_link} ${css.publish}`}
                      href="/manage-tools/new"
                    >
                      Опублікувати оголошення
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className={css.nav_list_item}>
                    <Link
                      className={css.nav_list_link}
                      href="/auth/login"
                    >
                      Увійти
                    </Link>
                  </li>

                  <li className={css.nav_list_item}>
                    <Link
                      className={css.nav_list_link}
                      href="/auth/register"
                    >
                      Зареєструватися
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <ul className={css.social_links}>
            <li>
              <Link
                href="https://www.facebook.com"
                target="_blank"
                aria-label="facebook"
                className={css.social_link_item}
              >
                <svg className={css.social_icon} aria-hidden="true">
                  <use href="/sprite.svg#facebook"></use>
                </svg>
              </Link>
            </li>

            <li>
              <Link
                href="https://www.instagram.com"
                target="_blank"
                aria-label="instagram"
                className={css.social_link_item}
              >
                <svg className={css.social_icon} aria-hidden="true">
                  <use href="/sprite.svg#instagram"></use>
                </svg>
              </Link>
            </li>
          </ul>
        </div>

        <div className={css.text_container}>
          <p className={css.footer_text}>
            © {currentYear} ToolNext. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

