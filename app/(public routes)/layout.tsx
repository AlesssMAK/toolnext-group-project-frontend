import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';

type PublicRoutesLayoutProps = {
  children: React.ReactNode;
};

export default function PublicRoutesLayout({
  children,
}: PublicRoutesLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
