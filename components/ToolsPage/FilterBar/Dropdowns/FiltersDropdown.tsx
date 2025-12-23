import styles from '../FilterBar.module.css';

type Props = {
  selectedTag: string;
  handleSelect: (value: string) => void;
  categories: {
    _id: string;
    title: string;
  }[];
};


const FiltersDropdown = ({
  selectedTag,
  handleSelect,
  categories,
}: Props) => {
  return (
    <ul className={styles.dropdown} role="listbox">
      <li
        className={`${styles.option} ${
          !selectedTag ? styles.optionSelected : ''
        }`}
        role="option"
        aria-selected={!selectedTag}
        onClick={() => handleSelect('')}
      >
        Всі категорії
      </li>

      {categories.map(({ _id, title }) => (
        <li
          key={_id}
          className={`${styles.option} ${
            selectedTag === _id ? styles.optionSelected : ''
          }`}
          role="option"
          aria-selected={selectedTag === _id}
          onClick={() => handleSelect(_id)}
        >
          {title}
        </li>
      ))}
    </ul>
  );
};

export default FiltersDropdown;
