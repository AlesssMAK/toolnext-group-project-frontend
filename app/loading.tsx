import css from './loading.module.css';
import Loader from '@/components/Loader/Loader';

export default function LoadingIndicator() {
  return (
    <div className={css.backdrop}>
      <Loader />
    </div>
  );
}
