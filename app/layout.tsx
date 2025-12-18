import 'normalize.css';
import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';
import './globals.css';

import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';

/* ---------------- FONTS ---------------- */

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['cyrillic'],
  display: 'swap',
});

/* ---------------- METADATA ---------------- */

export const metadata: Metadata = {
  title: {
    default: 'ToolNext — оренда професійного інструменту',
    template: '%s | ToolNext',
  },
  description:
    'ToolNext — сервіс оренди професійного будівельного, садового та електроінструменту в Києві. Швидке онлайн-бронювання.',

  metadataBase: new URL('https://toolnext.ua'),

  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://toolnext.ua',
    siteName: 'ToolNext',
    title: 'ToolNext — оренда професійного інструменту',
    description:
      'Оренда професійного інструменту для ремонту, будівництва та саду. Зручно, швидко, вигідно.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ToolNext — оренда інструменту',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* ---------------- LAYOUT ---------------- */

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <Toaster position="top-right" />
        <TanStackProvider>
          <AuthProvider>
            {modal}
            {children}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
