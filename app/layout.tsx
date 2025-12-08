import 'normalize.css';
import type { Metadata } from 'next';
import { Work_Sans, Nunito_Sans } from 'next/font/google';
import './globals.css';
import 'normalize.css';

const workSans = Work_Sans({
  variable: '--font-work_sans',
  subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
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
  // twitter: {
  //   card: '',
  //   site: '',
  //   title: 'ToolNext',
  //   description:
  //     'Відкрийте для себе широкий вибір якісних товарів у нашому онлайн-магазині. Швидка доставка, безпечна оплата та зручний шопінг.',
  //   images: [],
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} ${nunitoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
