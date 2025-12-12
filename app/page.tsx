import Image from 'next/image';
import styles from './page.module.css';
import HeroBlock from "@/components/HeroBlock/HeroBlock";
import { FeaturedToolsBlock } from '@/components/FeaturedToolsBlock/FeaturedToolsBlock';

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <HeroBlock />
        <FeaturedToolsBlock />
      </main>
    </div>
  );
}
