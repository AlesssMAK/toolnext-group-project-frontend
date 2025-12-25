import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

import styles from '../FilterBar.module.css';

type Props = {
  categories: {
    _id: string;
    title: string;
  }[];
  selectedTags: string[];
  onToggle: (id: string) => void;
};

const FiltersDropdown = ({
  categories,
  selectedTags,
  onToggle,
}: Props) => {
  return (
    <div className={styles.dropdown}>
      <OverlayScrollbarsComponent
        className={styles.osWrap}
      >
        <ul role="listbox">
          {categories.map(({ _id, title }) => {
            const isSelected = selectedTags.includes(_id);

            return (
              <li
                key={_id}
                role="option"
                aria-selected={isSelected}
                className={`${styles.option} ${
                  isSelected ? styles.optionSelected : ''
                }`}
                onClick={() => onToggle(_id)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default FiltersDropdown;
