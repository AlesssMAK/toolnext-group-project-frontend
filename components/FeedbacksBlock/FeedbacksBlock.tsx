'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import style from './FeedbacksBlock.module.css';

interface Review {
  id: string;
  authorName: string;
  text: string;
  rating: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const FeedbacksBlock = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const res = await fetch(`${API_BASE_URL}/api/reviews`);
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await res.json();

        const reviewsFromApi = Array.isArray(data) ? data : data.data;

        setReviews(reviewsFromApi);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? style.starFilled : style.star}
      >
        {' '}
        ★
      </span>
    ));
  };
  return (
    <section className={style.section} id="feedbacks">
      <div className={style.container}>
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
              //Mobil
              slidesPerView={1}
              spaceBetween={32}
              //Tablet and Desktop
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1440: {
                  slidesPerView: 3,
                },
              }}
              navigation={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              className={style.swiper}
            >
              |
              {reviews.map(reviews => (
                <SwiperSlide key={reviews.id}>
                  <article className={style.card}>
                    <div className={style.rating}>
                      {renderStars(reviews.rating)}
                    </div>
                    <p className={style.text}>{reviews.text}</p>
                    <p className={style.author}>{reviews.authorName}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};
