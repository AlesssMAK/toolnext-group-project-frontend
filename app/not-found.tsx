import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено | ToolNext',
  description: 'Запитувана сторінка не існує',
};

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Сторінку не знайдено</h2>
      <p>На жаль, сторінку, яку ви шукаєте, не існує або була переміщена.</p>
      <Link href="/">Повернутися на головну</Link>
    </div>
  );
}
