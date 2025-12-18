import Image from 'next/image';
import styles from './page.module.css';
import HeroBlock from '@/components/HeroBlock/HeroBlock';
import BenefitsBlock from '@/components/BenefitsBlock/BenefitsBlock';
import { FeaturedToolsBlock } from '@/components/FeaturedToolsBlock/FeaturedToolsBlock';
import { FeedbacksBlock } from '@/components/FeedbacksBlock/FeedbacksBlock';
import RegistrationBlock from '@/components/RegistrationBlock/RegistrationBlock';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'ToolNext — оренда професійного інструменту в Києві',
  description: 'ToolNext — сервіс оренди будівельного, садового та професійного інструменту. Швидке бронювання, вигідні ціни, широкий вибір.',
  keywords: 'оренда інструменту київ, прокат інструменту, будівельний інструмент оренда, toolnext',
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <Header />
        <HeroBlock />
        <BenefitsBlock />
        <FeaturedToolsBlock />
        <FeedbacksBlock />
        <RegistrationBlock />
        <Footer />
      </main>
    </div>
  );
}
