'use client';

import React, { useId, useState } from 'react';
import * as Yup from 'yup';
import css from './BookingToolForm.module.css';
import { useRouter } from 'next/navigation';

import { Booking } from '@/types/booking';
import  Calendar  from '@/components/Calendar/Calendar';


export const bookingSchema = Yup.object({
  firstName: Yup.string().min(2).max(50).required('Вкажіть ім’я'),
  lastName: Yup.string().min(2).max(50).required('Вкажіть прізвище'),
  phone: Yup.string().matches(/^\+38\d{10}$/, 'Формат: +38XXXXXXXXXX').required('Вкажіть номер телефону'),
  startDate: Yup.date().required('Вкажіть дату початку'),
  endDate: Yup.date().required('Вкажіть дату завершення').min(Yup.ref('startDate'), 'Кінцева дата не може бути раніше початкової'),
  deliveryCity: Yup.string().min(2).max(100).required('Вкажіть місто'),
  deliveryBranch: Yup.string().min(1).max(200).required('Вкажіть відділення'),
});

const initialDraft: Booking = {
  firstName: '',
  lastName: '',
  phone: '',
  startDate: '',
  endDate: '',
  deliveryCity: '',
  deliveryBranch: '',
};


const BookingToolPage = () => {
  const fieldId = useId();
  const router = useRouter();

  const [draft, setDraft] = useState<Booking>(initialDraft);

  const [errors, setErrors] = useState<Partial<Record<keyof Booking, string>>>({});
  const [loading, setLoading] = useState(false);

  const pricePerDay = 500;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Сабміт викликано!', draft);

    try {
      await bookingSchema.validate(draft, { abortEarly: false });
      setErrors({});
      setLoading(true);

      // await axios.post('/api/book', draft);

      router.push('/BookingConfirmation');
      setDraft(initialDraft);

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formattedErrors: Partial<Record<keyof Booking, string>> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            formattedErrors[err.path as keyof Booking] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const start = draft.startDate ? new Date(draft.startDate) : null;
  const end = draft.endDate ? new Date(draft.endDate) : null;
  let totalPrice = 0;
  if (start && end && end > start) {
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    totalPrice = diffDays * pricePerDay;
  }

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.title}>
          <h2>Підтвердження бронювання</h2>
        </div>
        <form className={css.form} onSubmit={handleSubmit}>
          <ul className={css.list}>
            <li className={css.item}>
              <label className={css.label} htmlFor={`${fieldId}-firstName`}>Ім’я</label>
              <input
                className={css.field}
                id={`${fieldId}-firstName`}
                name="firstName"
                value={draft.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
            </li>

            <li className={css.item}>
              <label className={css.label} htmlFor={`${fieldId}-lastName`}>Прізвище</label>
              <input
                className={css.field}
                id={`${fieldId}-lastName`}
                name="lastName"
                value={draft.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
            </li>
          </ul>

          <ul className={css.listphone}>
            <li className={css.item}>
              <label className={css.label} htmlFor={`${fieldId}-phone`}>Номер телефону</label>
              <input
                className={css.field}
                id={`${fieldId}-phone`}
                name="phone"
                value={draft.phone}
                onChange={handleChange}
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </li>
          </ul>

          <div className={css.item}>
  <label className={css.label}>Період бронювання</label>
  <div >
    <Calendar
      startDate={draft.startDate}
      endDate={draft.endDate}
      bookedDates={[
        "2025-12-20T00:00:00.000Z",
        "2025-12-21T00:00:00.000Z",
        "2025-12-25T00:00:00.000Z"
      ]}
      onChange={({ start, end }) =>
        setDraft({ ...draft, startDate: start, endDate: end })
      }
    />
  </div>
  {errors.startDate && <div className="error">{errors.startDate}</div>}
  {errors.endDate && <div className="error">{errors.endDate}</div>}
          </div>
          

{/* Місто доставки */}
          <ul className={css.list}>
            <li className={css.item}>
              <label className={css.label} htmlFor={`${fieldId}-deliveryCity`}>Місто доставки</label>
              <input
                className={css.field}
                id={`${fieldId}-deliveryCity`}
                name="deliveryCity"
                value={draft.deliveryCity}
                onChange={handleChange}
              />
              {errors.deliveryCity && <div className="error">{errors.deliveryCity}</div>}
            </li>

            <li className={css.item}>
              <label className={css.label} htmlFor={`${fieldId}-deliveryBranch`}>Відділення Нової Пошти</label>
              <input
                className={css.field}
                id={`${fieldId}-deliveryBranch`}
                name="deliveryBranch"
                value={draft.deliveryBranch}
                onChange={handleChange}
              />
              {errors.deliveryBranch && <div className="error">{errors.deliveryBranch}</div>}
            </li>
          </ul>

          <div className={css.priceBlock}>
            <strong className={css.price}>Ціна: {totalPrice > 0 ? `${totalPrice} грн` : ''}</strong>
          </div>

          <button type="submit" className={`${css.priceButton} button--primary`} disabled={loading}>
            {loading ? 'Завантаження...' : 'Забронювати'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingToolPage;


{/* <li className={css.item}>
              <label className={css.label} htmlFor={`${fieldId}-startDate`}>Початкова дата</label>
              <input
                className={css.field}
                id={`${fieldId}-startDate`}
                name="startDate"
                type="date"
                value={draft.startDate}
                onChange={handleChange}
              />
              {errors.startDate && <div className="error">{errors.startDate}</div>}
            </li>

            <li className={css.item}>
              <label className={css.label} htmlFor={`${fieldId}-endDate`}>Кінцева дата</label>
              <input
                className={css.field}
                id={`${fieldId}-endDate`}
                name="endDate"
                type="date"
                value={draft.endDate}
                onChange={handleChange}
              />
              {errors.endDate && <div className="error">{errors.endDate}</div>}
            </li> */}