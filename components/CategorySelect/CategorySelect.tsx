"use client";

import { Listbox } from "@headlessui/react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import clsx from "clsx";
import styles from "./CategorySelect.module.css";

export type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
};

export default function CategorySelect({
  options,
  value,
  onChange,
}: Props) {
  return (
    <Listbox value={value} onChange={onChange} multiple>
      {({ open }) => {
        const iconId = open
          ? "keyboard_arrow_up"
          : "keyboard_arrow_down";

        return (
          <div className={styles.wrapper}>
            <Listbox.Button
              className={clsx(styles.trigger, open && styles.open)}
            >
              <span className={styles.label}>
                {value.length === 0
                  ? "Всі категорії"
                  : value.length === 1
                  ? value[0].label
                  : `Обрано: ${value.length}`}
              </span>

              <svg
                width="24"
                height="24"
                className={styles.icon}
                aria-hidden
              >
                <use href={`/sprite.svg#${iconId}`} />
              </svg>
            </Listbox.Button>

            {open && (
              <Listbox.Options static className={styles.dropdown}>
                <OverlayScrollbarsComponent
                  className={styles.scroll}
                  options={{ scrollbars: { autoHide: "never" } }}
                >
                  {options.map(option => {
                    const selected = value.some(
                      v => v.value === option.value
                    );

                    return (
                      <Listbox.Option
                        key={option.value}
                        value={option}
                        className={({ active }) =>
                          clsx(
                            styles.option,
                            active && styles.active,
                            selected && styles.selected
                          )
                        }
                      >
                        <span>{option.label}</span>

                        {selected && (
                          <span className={styles.check}>✓</span>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </OverlayScrollbarsComponent>
              </Listbox.Options>
            )}
          </div>
        );
      }}
    </Listbox>
  );
}
