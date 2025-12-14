import Image from 'next/image';
import Link from 'next/link';
import css from "./AuthLayout.module.css"
export const dynamic = 'force-static'; // або не треба, якщо нема props

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className={css.header}>
        <Link href={'/'}>
          <Image src="/logo.svg" alt="ToolNext" width={83} height={15} />
        </Link>
      </header>
      <main>{children}</main>
      <footer className={css.footer}>© 2025 ToolNext</footer>
    </div>
  );
}
