import Image from 'next/image';
import styles from './page.module.css';
import HeroBlock from "@/components/HeroBlock/HeroBlock";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <HeroBlock />
      </main>
    </div>
  );
}
