import 'normalize.css';
import type { Metadata } from 'next';
import { Inter, Nunito_Sans } from 'next/font/google';
import './globals.css';
import 'normalize.css';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: '--font-Inter',
  subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'ToolNext',
  description: '',
  openGraph: {
    type: 'website',
    url: '',
    title: 'ToolNext',
    description: '',
    images: [
      {
        url: '',
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
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
