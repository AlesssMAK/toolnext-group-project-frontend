'use client';

import styles from './heroBlock.module.css';
import HeroForm from './heroForm/HeroForm';

const HeroBlock = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>ToolNext — ваш надійний сусід</h1>
      <HeroForm />
    </section>
  );
};

export default HeroBlock;
