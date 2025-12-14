'use client';

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";

import { Rating } from "../RatingIcon/RatingIcon";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import style from './FeedbacksBlock.module.css';

type FeedbackApiItem = {
    _id: string;
    name: string;
    description: string;
    rate: number;
}

type FeedbackApiResponse = {
    page: number;
    perPage: number;
    totalPages: number;
    totalFeedbacks: number;
    feedbacks: FeedbackApiItem[];
}

interface Review { 
    id: string;
    authorName: string;
    text: string;
    rating: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const FeedbacksBlock = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setIsLoading(true);
                setIsError(false);

                const res = await fetch(`${API_BASE_URL}/api/feedbacks`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status}`);
                }

                const data = (await res.json()) as FeedbackApiResponse;

                const reviewsFromApi: Review[] = (data.feedbacks ?? []).map((f: FeedbackApiItem) => ({
                    id: f._id,
                    authorName: f.name,
                    text: f.description,
                    rating: f.rate,
      }));
                setReviews(reviewsFromApi);
            } catch (error) {
                console.error(error);
                setIsError(true);
                setReviews([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, [])

    
    return (
        <section className={style.section} id="feedbacks">
            <div className="container">
                <h2 className={style.title}>Останні відгуки</h2>

                {isError && (
                    <p className={ style.error}>Не вдалося завантажити відгуки. Спробуйте пізніше.</p>
                )}

                {isLoading ? (
                    <p className={ style.loader}>Завантаження...</p>) : reviews.length === 0 ? (
                        <p className={style.empty}>Поки що немає відгуків.</p>
                    ) : (
                            <div className={ style.swiperWrapper}>
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    observer
                                    observeParents
                                    updateOnWindowResize
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
                                    
                                    navigation
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                        dynamicMainBullets: 5,
                                        
                                    }}
                                    className={style.swiper}
                                >
                                    {
                                        reviews.map((r) => (
                                            <SwiperSlide key={r.id}>
                                                <article className={style.card}>
                                                <Rating value={r.rating} />
                                                    {/* <div className={style.rating}>{renderStars(reviews.rating)}</div> */}
                                                    <p className={style.text}>{r.text}</p>
                                                    <p className={style.author}>{r.authorName}</p>
                                                </article>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </div>
                        )}            
            </div>            
        </section>
    )
}
