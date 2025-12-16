'use client';

import Image from 'next/image';
import Link from 'next/link';
import css from './AuthLayout.module.css';
import { usePathname } from 'next/navigation';
export const dynamic = 'force-static'; // або не треба, якщо нема props

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const isLogin = pathname === '/auth/login';
  const imageSrc = isLogin
    ? '/images/register_login_form/login_image.png'
    : '/images/register_login_form/register-image.png';

  const imageAlt = isLogin ? 'Вхід' : 'Реєстрація';
  return (
    <div className={css.authContainer}>
      <div>
        <header className={css.header}>
          <Link href={'/'}>
            <Image src="/logo.svg" alt="ToolNext" width={83} height={15} />
          </Link>
        </header>
        <main className={css.mainContent}>{children}</main>
        <footer className={css.footer}>© {currentYear} ToolNext</footer>
      </div>
      <Image
        src={imageSrc}
        alt="Інструменти"
        width={704}
        height={900}
        className={css.imageSection}
      />
    </div>
  );
}
