import Link from 'next/link';
import css from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.footer_container}>
          <a href="" aria-label="На головну" className={css.logo}>
            <svg className={css.logo_icon} aria-hidden="true">
              <use href="/sprite.svg#AlternateFalse"></use>
            </svg>
          </a>
          <nav>
            <ul className={css.nav_list}>
              <li className={css.nav_list_item}>
                <a href="./">Головна</a>
              </li>
              <li className={css.nav_list_item}>
                <a href="./tools">Інструменти</a>
              </li>
              <li className={css.nav_list_item}>
                <a href="./auth/login">Увійти</a>
              </li>
              <li className={css.nav_list_item}>
                <a href="./auth/register">Зареєствуватися</a>
              </li>
            </ul>
          </nav>
          <ul className={css.social_links}>
            <li className={css.social_list_item}>
              <Link
                href="https://www.facebook.com"
                aria-label="facebook"
                target="_blank"
                className={css.social_link_item}
              >
                <svg className={css.social_icon} aria-hidden="true">
                  <use href="/sprite.svg#facebook"></use>
                </svg>
              </Link>
            </li>
            <li className={css.social_list_item}>
              <Link
                href="https://www.instagram.com"
                aria-label="instagram"
                target="_blank"
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
