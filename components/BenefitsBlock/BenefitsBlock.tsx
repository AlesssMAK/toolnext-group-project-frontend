import styles from './benefitsBlock.module.css';

const BenefitsBlock = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headerBlock}>
      <h2 className={styles.title}>ToolNext — платформа для швидкої та зручної оренди інструментів</h2>
<p className={styles.description}>ToolNext допомагає знайти потрібний інструмент у декілька кліків.
Користувачі можуть легко орендувати обладнання для ремонту чи хобі, а власники — зручно керувати своїми оголошеннями.
        Ми створили сервіс, щоб зробити процес оренди простим, доступним і вигідним для всіх.</p>
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <img src="/images/main_page/benefitsBlock/benefitsBlock_1.svg" aria-hidden="true" alt=""/>
          <h3 className={styles.itemTitle}>
            Легкий доступ до інструментів
          </h3>
          <p className={styles.itemText}>
            Знаходьте потрібний інструмент у своєму районі без зайвих дзвінків і пошуків. Просто введіть назву — і отримайте варіанти поруч із вами.
          </p>
        </li>
        <li className={styles.item}>
          <img src="/images/main_page/benefitsBlock/benefitsBlock_2.svg" aria-hidden="true" alt=""/>
          <h3 className={styles.itemTitle}>Швидке бронювання</h3>
          <p className={styles.itemText}>
            Бронюйте інструменти в кілька кліків. Жодних складних форм чи довгих очікувань — тільки простий та зручний процес.
          </p>
        </li>   
        <li className={styles.item}>
          <img src="/images/main_page/benefitsBlock/benefitsBlock_3.svg" aria-hidden="true" alt=""/>
          <h3 className={styles.itemTitle}>Зручне управління</h3>
          <p className={styles.itemText}>
            Додавайте свої інструменти в каталог, редагуйте оголошення та контролюйте оренду. ToolNext допомагає перетворити зайві інструменти на додатковий дохід.
          </p>
        </li>
          </ul>
    </section>
  );
};

export default BenefitsBlock;