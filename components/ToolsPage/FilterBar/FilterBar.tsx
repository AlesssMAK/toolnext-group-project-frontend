"use client";

import styles from "./FilterBar.module.css";

export default function FilterBar() {
  return (
    <div className={styles.filterBar}>
      <select className={styles.select}>
        <option>Всі категорії</option>
        <option>Перфоратори та відбійні молотки</option>
        <option>Дрилі, шуруповерти та гайковерти</option>
        <option>Шліфувальні та полірувальні машини</option>
        <option>Пилки та різаки</option>
        <option>Плиткорізи та інструменти для плитки</option>
        <option>Option 7</option>
      </select>

      <button className={styles.resetBtn}>Скинути фільтри</button>
    </div>
  );
}
