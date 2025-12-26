import 'normalize.css';
import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';
import './globals.css';
import 'air-datepicker/air-datepicker.css';
import './datepicker.css'
import 'normalize.css';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';
import ScrollToTopButton from '@/components/ScrollToTopBtn/ScrollToTopButton';

const inter = Inter({
  variable: '--font-Inter',
  subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: {
    default: 'ToolNext',
    template: '%s | ToolNext',
  },
  description:
    'Сервіс оренди професійних інструментів для дому та бізнесу.',
  openGraph: {
    type: 'website',
    title: 'ToolNext',
    description:
      'Оренда інструментів по всій Україні.',
    images: [
      {
        url: 'https://toolnext.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'ToolNext',
      },
    ],
  },
};


export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunitoSans.variable}`}>
        <Toaster position="top-right" />
        <TanStackProvider>
          <AuthProvider>
            {modal}
            {children}
            <ScrollToTopButton showAfter={700} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
