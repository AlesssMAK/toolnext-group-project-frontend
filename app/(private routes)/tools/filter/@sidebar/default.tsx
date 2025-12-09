'use client';

import { tags } from '@/constants/tags';
import css from './SidebarNotes.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarNotes = () => {
  const pathname = usePathname();
  return (
    <>
      <ul className={css.menuList}>
        {tags.map((tag) => {
          const url =
            tag === 'All' ? '/notes/filter/All' : `/notes/filter/${tag}`;
          const isActive = pathname === url;
          return (
            <li
              key={tag}
              className={css.menuItem}
            >
              <Link
                href={url}
                className={`${css.menuLink} ${isActive ? css.active : ''}`}
              >
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SidebarNotes;
