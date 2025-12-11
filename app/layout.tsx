import 'normalize.css';
import type { Metadata } from 'next';
import { Work_Sans, Nunito_Sans } from 'next/font/google';
import './globals.css';
import 'normalize.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
// import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const workSans = Work_Sans({
  variable: '--font-work_sans',
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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${nunitoSans.variable}`}>
        <TanStackProvider>
          {/* <AuthProvider> */}
            <Header />
            {children}
            <Footer />
          {/* </AuthProvider> */}
        </TanStackProvider>
      </body>
    </html>
  );
}
