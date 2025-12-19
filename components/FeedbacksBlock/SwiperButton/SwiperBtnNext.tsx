import css from './SwiperBtn.module.css';

const SwiperBtnNext = () => {
  return (
    <button className={css.swiperButtonNext}>
      <svg width="24" height="24">
        <use href="/sprite.svg#arrow_forward"></use>
      </svg>
    </button>
  );
};

export default SwiperBtnNext;
