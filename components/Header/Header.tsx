import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Link href="/" aria-label="Home">
        Header
      </Link>
      <nav aria-label="Main Navigation">
        <ul>
          <li>
            <Link href="/auth/login">Увійти</Link>
          </li>
          <li>
            <Link href="/auth/register">Реєстрація</Link>
          </li>
        </ul>
      </nav>
   </header>
  ) 

};

export default Header;
