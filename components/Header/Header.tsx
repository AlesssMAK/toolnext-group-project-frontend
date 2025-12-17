import css from './Header.module.css';
import { Navigation } from '../Navigation/Navigation';
import { HeaderClient } from '../HeaderClient/HeaderClient';

const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerContainer}>
          <a href="/" className={css.logo}>
            <svg width="83" height="15" viewBox="0 0 177 32" aria-hidden="true">
              <use href="/sprite.svg#icon-logo" />
            </svg>
          </a>
          {/* Desktop navigation */}
          <div className={css.navDesktop}>
            <Navigation variant="header" />
          </div>
          {/* Mobile burger */}
          <div className={css.navTabMob}>
            <HeaderClient />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
