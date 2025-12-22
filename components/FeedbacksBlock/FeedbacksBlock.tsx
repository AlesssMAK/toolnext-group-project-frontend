'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useQuery } from '@tanstack/react-query';
import style from './FeedbacksBlock.module.css';
import { fetchFeedbacks } from '@/lib/api/clientApi';
import EmptyFeedbacks from './EmptyFeedback/EmptyFeedbacks';
import EmptyUserFeedbacks from './EmptyFeedback/EmptyUserFeedbacks';
import { useEffect, useState, useRef } from 'react';
import EmptyUserPersonalFeedbacks from './EmptyFeedback/EmptyUserPersonalFeedbacks';
import { Rating } from '../RatingIcon/RatingIcon';
import type { Swiper as SwiperClass } from 'swiper';
import { FeedbacksBlockProps } from '@/types/feedback';

export type FeedbacksVariant = 'home' | 'tool' | 'profile';

function getWindow5(active: number, total: number) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i);

  let start = active - 2;
  let end = active + 2;

  if (start < 0) {
    end += -start;
    start = 0;
  }
  if (end > total - 1) {
    const shift = end - (total - 1);
    start = Math.max(0, start - shift);
    end = total - 1;
  }

  return Array.from({ length: 5 }, (_, i) => start + i);
}

const FeedbacksBlock = ({
  toolId,
  userId,
  isOwner = false,
  variant = 'home',
}: FeedbacksBlockProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [navReady, setNavReady] = useState(false);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const [activePage, setActivePage] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const [groupNow, setGroupNow] = useState(1);

  const setPrevEl = (el: HTMLButtonElement | null) => {
    prevRef.current = el;
    setNavReady(!!el && !!nextRef.current);
  };

  const setNextEl = (el: HTMLButtonElement | null) => {
    nextRef.current = el;
    setNavReady(!!prevRef.current && !!el);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['feedbackKey', toolId, userId],
    queryFn: () => fetchFeedbacks({ page: 1, toolId, userId }),
  });

  const allFeedbacks = data?.feedbacks ?? [];

  const hasFeedbacks = isSuccess && allFeedbacks.length > 0;
  const hasNoFeedbacks = isSuccess && allFeedbacks.length === 0;

  const isToolPage = Boolean(toolId);
  const isUserPage = Boolean(userId);
  const isMainPage = !toolId && !userId;

  const syncPageState = (swiper?: SwiperClass | null) => {
    if (!swiper || swiper.destroyed) return;

    setIsBeginning(!!swiper.isBeginning);
    setIsEnd(!!swiper.isEnd);

    setActivePage(swiper.snapIndex ?? 0);

    const total = swiper.snapGrid?.length ?? 1;
    setPagesCount(total);
    const spgRaw = swiper.params?.slidesPerGroup;
    const spg = typeof spgRaw === 'number' && spgRaw > 0 ? spgRaw : 1;

    setGroupNow(spg);
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    const canNav = navReady && prevRef.current && nextRef.current;

    if (!swiper || !canNav) return;

    // @ts-expect-error
    swiper.params.navigation.prevEl = prevRef.current;
    // @ts-expect-error
    swiper.params.navigation.nextEl = nextRef.current;

    swiper.navigation.init();
    swiper.navigation.update();

    return () => {
      if (swiper.destroyed) return;
      swiper.navigation?.destroy?.();
    };
  }, [navReady]);

  return (
    <section
      className={`${style.feedback} ${style[`feedback--${variant}`]}`}
      id="feedbacks"
    >
      <div className="container">
        <div
          className={`${style.titleContainer} ${style[`titleContainer--${variant}`]}`}
        >
          <h2 className={`${style.title} ${style[`title--${variant}`]}`}>
            {isMainPage && 'Останні відгуки'}
            {(isToolPage || isUserPage) && 'Відгуки'}{' '}
          </h2>
          {isToolPage && (
            <button className={`${style.feedbackBtn} button button--secondary`}>
              Залишити відгук
            </button>
          )}
        </div>
        {hasNoFeedbacks && isToolPage && <EmptyFeedbacks />}
        {hasNoFeedbacks && isUserPage && !isOwner && <EmptyUserFeedbacks />}
        {hasNoFeedbacks && isUserPage && isOwner && (
          <EmptyUserPersonalFeedbacks />
        )}
        {hasFeedbacks && (
          <div className={style.swiperWrapper}>
            <Swiper
              modules={[Navigation]}
              onSwiper={swiper => {
                swiperRef.current = swiper;
                syncPageState(swiper);
              }}
              onSlideChange={swiper => {
                syncPageState(swiper);
              }}
              onBreakpoint={swiper => {
                requestAnimationFrame(() => syncPageState(swiper));
              }}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={16}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 12,
                },
                375: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 24,
                },
                1440: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 32,
                },
              }}
              navigation={
                navReady
                  ? { prevEl: prevRef.current, nextEl: nextRef.current }
                  : false
              }
              className={style.swiper}
            >
              {allFeedbacks.map(feedback => (
                <SwiperSlide key={feedback._id}>
                  <article className={style.card}>
                    <Rating value={feedback.rate} />
                    <p className={style.text}>{feedback.description}</p>
                    <p className={style.author}>{feedback.name}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className={style.feedbackSwiperContainer}>
              <div className={style.pagination} aria-label="Pagination">
                {getWindow5(activePage, pagesCount).map(i => {
                  const dist = Math.abs(i - activePage);
                  const sizeClass =
                    dist === 0
                      ? style.dotMain
                      : dist === 1
                        ? style.dotMid
                        : style.dotSmall;

                  return (
                    <button
                      key={i}
                      type="button"
                      className={`${style.dot} ${sizeClass} ${
                        i === activePage ? style.dotActive : ''
                      }`}
                      aria-label={`Go to page ${i + 1}`}
                      onClick={() => swiperRef.current?.slideTo(i * groupNow)}
                    />
                  );
                })}
              </div>

              <div className={style.arrows}>
                <button
                  ref={setPrevEl}
                  type="button"
                  className={style.arrowBtn}
                  aria-label="Prev"
                >
                  <svg
                    width="24"
                    height="24"
                    className={style.btnIcon}
                    aria-hidden="true"
                  >
                    <use href="/sprite.svg#arrow_back" />
                  </svg>
                </button>

                <button
                  ref={setNextEl}
                  type="button"
                  className={style.arrowBtn}
                  aria-label="Next"
                >
                  <svg
                    width="24"
                    height="24"
                    className={style.btnIcon}
                    aria-hidden="true"
                  >
                    <use href="/sprite.svg#arrow_forward" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbacksBlock;
