import styles from '../FilterBar.module.css';

type Props = {
  selectedTag: string;
  handleSelect: (value: string) => void;
  categoryNames: Record<string, string>;
};

const FiltersDropdown = ({
  selectedTag,
  handleSelect,
  categoryNames,
}: Props) => {
  return (
    <ul className={styles.dropdown} role="listbox">
      <li
        className={`${styles.option} ${!selectedTag ? styles.optionSelected : ''}`}
        role="option"
        aria-selected={!selectedTag}
        onClick={() => handleSelect('')}
      >
        Всі категорії
      </li>
      {Object.entries(categoryNames).map(([key, name]) => (
        <li
          key={key}
          className={`${styles.option} ${selectedTag === key ? styles.optionSelected : ''}`}
          role="option"
          aria-selected={selectedTag === key}
          onClick={() => handleSelect(key)}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};

export default FiltersDropdown;
