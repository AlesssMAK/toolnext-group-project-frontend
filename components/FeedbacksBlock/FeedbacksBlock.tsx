'use client';

import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperClass } from 'swiper';

import { Rating } from '../RatingIcon/RatingIcon';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import style from './FeedbacksBlock.module.css';

type FeedbackApiItem = {
  _id: string;
  name: string;
  description: string;
  rate: number;
};
type FeedbackApiResponse = {
  feedbacks: FeedbackApiItem[];
  page: number;
  perPage: number;
  totalPages: number;
  totalFeedbacks: number;
};

interface Review {
  id: string;
  authorName: string;
  text: string;
  rating: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const FeedbacksBlock = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const setPrevEl = (el: HTMLButtonElement | null) => {
    prevRef.current = el;
    setNavReady(!!el && !!nextRef.current);
  };

  const setNextEl = (el: HTMLButtonElement | null) => {
    nextRef.current = el;
    setNavReady(!!prevRef.current && !!el);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch(`${API_BASE_URL}/api/feedbacks`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const data = (await res.json()) as FeedbackApiResponse;

        setReviews(
          (data.feedbacks ?? []).map(f => ({
            id: f._id,
            authorName: f.name,
            text: f.description,
            rating: f.rate,
          }))
        );
      } catch (error) {
        console.error(error);
        setIsError(true);
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper || !navReady) return;

    // @ts-expect-error
    swiper.params.navigation.prevEl = prevRef.current;
    // @ts-expect-error
    swiper.params.navigation.nextEl = nextRef.current;

    swiper.navigation.init();
    swiper.navigation.update();

    return () => {
      swiper.navigation.destroy();
    };
  }, [navReady, reviews.length]);

  return (
    <section className={`${style.section} container`} id="feedbacks">
      <h2 className={style.title}>Останні відгуки</h2>

      {isError && (
        <p className={style.error}>
          Не вдалося завантажити відгуки. Спробуйте пізніше.
        </p>
      )}

      {isLoading ? (
        <p className={style.loader}>Завантаження...</p>
      ) : reviews.length === 0 ? (
        <p className={style.empty}>Поки що немає відгуків.</p>
      ) : (
        <div className={style.swiperWrapper}>
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={swiper => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={swiper => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 12,
              },
              375: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            pagination={{
              el: '.js-feedback-pagination',
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 5,
            }}
            navigation={
              navReady
                ? { prevEl: prevRef.current, nextEl: nextRef.current }
                : false
            }
            className={style.swiper}
          >
            {reviews.map(r => (
              <SwiperSlide key={r.id}>
                <article className={style.card}>
                  <Rating value={r.rating} />
                  <p className={style.text}>{r.text}</p>
                  <p className={style.author}>{r.authorName}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={style.controls}>
            <div className={`${style.pagination} js-feedback-pagination`} />

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
    </section>
  );
};
