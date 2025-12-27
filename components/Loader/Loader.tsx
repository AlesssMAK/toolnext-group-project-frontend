import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.wrap}>
      <div className={css.spinner} />
      <p className={css.text}>Loading, please wait...</p>
    </div>
  );
}
