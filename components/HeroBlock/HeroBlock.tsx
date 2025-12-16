'use client';

import styles from './heroBlock.module.css';
import HeroForm from './heroForm/HeroForm';

const HeroBlock = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.title}>ToolNext — ваш надійний сусід</h1>
        <HeroForm />
      </div>
    </section>
  );
};

export default HeroBlock;
