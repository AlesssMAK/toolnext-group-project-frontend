'use client';

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { bookingSchema } from './validation';
import { computeTotal } from './utils';

type BookingValues = {
  firstName: string;
  lastName: string;
  phone: string;
  endDate: { start: Date | null; end: Date | null };
  city: string;
  novaPoshtaBranch: string;
};

const initialValues: BookingValues = {
  firstName: '',
  lastName: '',
  phone: '',
  endDate: { start: null, end: null },
  city: '',
  novaPoshtaBranch: '',
};

const PRICE_PER_DAY = 350; // UAH, винеси у конфіг

export default function BookingForm () {
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const createBooking = async (values: BookingValues) => {
    // заміни на реальний API ендпоінт
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message || 'Не вдалося створити бронювання');
    }
    return res.json();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookingSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitError(null);
        try {
          await createBooking(values);
          // редірект на підтвердження
          window.location.assign('/confirm/booking');
        } catch (err: any) {
          setSubmitError(err.message || 'Сталася помилка. Спробуйте ще раз.');
        } finally {
          setSubmitting(false);
        }
      }}
      validateOnBlur
      validateOnChange
    >
      {({ values, isSubmitting, setFieldValue }) => {
        const total = computeTotal(
          PRICE_PER_DAY,
          values.endDate.start ?? undefined,
          values.endDate.end ?? undefined
        );

        return (
          <Form className="booking-form">

            <div className="form-row">
              <label htmlFor="firstName">Ім’я</label>
              <Field id="firstName" name="firstName" placeholder="Ваше імʼя" />
              <ErrorMessage component="div" className="error" name="firstName" />
            </div>

            <div className="form-row">
              <label htmlFor="lastName">Прізвище</label>
              <Field id="lastName" name="lastName" placeholder="Ваше прізвище" />
              <ErrorMessage component="div" className="error" name="lastName" />
            </div>

            <div className="form-row">
              <label htmlFor="phone">Телефон</label>
              <Field id="phone" name="phone" placeholder="+38 (XXX) XXX XX XX" />
              <ErrorMessage component="div" className="error" name="phone" />
            </div>

            {/* Період бронювання: приклад з двома полями дат */}
            <div className="form-row">
              <label>Виберіть період бронювання</label>
              <div className="date-row">
                <input
                  type="date" placeholder="Початкова дата"
                  value={values.endDate.start ? toInputDate(values.endDate.start) : ''}
                  onChange={(e) =>
                    setFieldValue('period.start', fromInputDate(e.target.value))
                  }
                        />
                    </div>
                    <div>
                <input
                  type="date"
                  value={values.endDate.end ? toInputDate(values.endDate.end) : ''}
                  onChange={(e) =>
                    setFieldValue('period.end', fromInputDate(e.target.value))
                  }
                />
              </div>
              <ErrorMessage component="div" className="error" name="period.start" />
              <ErrorMessage component="div" className="error" name="period.end" />
            </div>

            {/* Місто доставки */}
            <div className="form-row">
              <label htmlFor="city">Місто доставки</label>
              <Field id="city" name="city" placeholder="Київ, Калинівка" />
              <ErrorMessage component="div" className="error" name="city" />
            </div>

            {/* Відділення Нової пошти */}
            <div className="form-row">
              <label htmlFor="novaPoshtaBranch">Відділення НП</label>
              <Field
                id="novaPoshtaBranch"
                name="novaPoshtaBranch"
                placeholder="Відділення №1"
              />
              <ErrorMessage component="div" className="error" name="novaPoshtaBranch" />
            </div>

            {submitError && <div className="submit-error">{submitError}</div>}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Створюємо бронювання…' : 'Підтвердити бронювання'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

// Допоміжні конвертори для <input type="date" />
const toInputDate = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const fromInputDate = (val: string) => {
  if (!val) return null;
  const [y, m, d] = val.split('-').map(Number);
  return new Date(y, m - 1, d);
};
