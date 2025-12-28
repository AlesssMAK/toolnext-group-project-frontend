'use client';

import css from './BookingToolForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { calcDaysInclusive } from '@/utils/date';

type BookedDateRange = {
  startDate: string;
  endDate: string;
};

type BookingFormProps = {
  toolId: string;
  pricePerDay: number;
  bookedDates?: BookedDateRange[];
};

interface MyFormValues {
  userFirstname: string;
  userLastname: string;
  userPhone: string;
  startDate: string | null;
  endDate: string | null;
  deliveryCity: string;
  deliveryBranch: string;
}

function parseISOToMidnight(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export default function BookingForm({
  toolId,
  pricePerDay,
  bookedDates,
}: BookingFormProps) {
  const router = useRouter();
  const [serverWarning, setServerWarning] = useState<string | null>(null);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object({
    userFirstname: Yup.string().min(2).max(50).required('Вкажіть імʼя'),
    userLastname: Yup.string().min(2).max(50).required('Вкажіть прізвище'),
    userPhone: Yup.string()
      .matches(/^\+?[0-9\s\-()]{7,20}$/, 'Невірний формат телефону')
      .required('Вкажіть номер телефону'),

    startDate: Yup.string()
      .nullable()
      .required('Оберіть дату початку')
      .test('not-in-past', 'Дата не може бути в минулому', value => {
        if (!value) return false;
        const d = parseISOToMidnight(value);
        return d.getTime() >= startOfToday.getTime();
      }),

    endDate: Yup.string()
      .nullable()
      .required('Оберіть дату завершення')
      .test(
        'is-after-start',
        'Дата завершення має бути пізніше або рівна початку',
        function (value) {
          const { startDate } = this.parent as MyFormValues;
          if (!startDate || !value) return true;

          const s = parseISOToMidnight(startDate).getTime();
          const e = parseISOToMidnight(value).getTime();

          return e >= s;
        }
      ),

    deliveryCity: Yup.string().min(2).required('Вкажіть місто'),
    deliveryBranch: Yup.string().min(1).required('Вкажіть відділення'),
  });

  return (
    <Formik<MyFormValues>
      initialValues={{
        userFirstname: '',
        userLastname: '',
        userPhone: '',
        startDate: null,
        endDate: null,
        deliveryCity: '',
        deliveryBranch: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setServerWarning(null);

        try {
          const res = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              ...values,
              toolId,
              startDate: values.startDate,
              endDate: values.endDate,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            if (data?.message?.includes('booked')) {
              setServerWarning('Інструмент вже зайнятий на вибрані дати');
              return;
            }
            setServerWarning(data?.message || 'Сталася помилка бронювання');
            return;
          }

          router.push('/confirm/booking');
        } catch (err) {
          setServerWarning((err as Error).message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ setFieldValue, values, isSubmitting }) => {
        // ✅ перевірочні логи (тимчасово)
        console.log('FORMIK startDate:', values.startDate);
        console.log('FORMIK endDate:', values.endDate);

        const bookingDays = calcDaysInclusive(values.startDate, values.endDate);
        const totalPrice = bookingDays * pricePerDay;

        return (
          <div className={css.container}>
            <h2 className={css.titleBooking}>Підтвердження бронювання</h2>

            <Form className={css.formBoking}>
              <ul className={css.blok_fameli_city}>
                <li>
                  <label className={css.labels} htmlFor="userFirstname">
                    Ім&apos;я
                  </label>
                  <Field
                    className={css.inputs}
                    name="userFirstname"
                    placeholder="Ваше імʼя"
                  />
                  <ErrorMessage
                    className={css.error_message}
                    name="userFirstname"
                    component="p"
                  />
                </li>

                <li>
                  <label className={css.labels} htmlFor="userLastname">
                    Прізвище
                  </label>
                  <Field
                    className={css.inputs}
                    name="userLastname"
                    placeholder="Прізвище"
                  />
                  <ErrorMessage
                    className={css.error_message}
                    name="userLastname"
                    component="p"
                  />
                </li>
              </ul>

              <ul className={css.blok_phone}>
                <li>
                  <label className={css.labels} htmlFor="userPhone">
                    Номер телефону
                  </label>
                  <Field
                    className={css.inputs_phone}
                    name="userPhone"
                    placeholder="+38 (XXX) XXX XX XX"
                  />
                  <ErrorMessage
                    className={css.error_message}
                    name="userPhone"
                    component="p"
                  />
                </li>
              </ul>

              <div className={css.blok_calendar}>
                <label className={css.labels}>Виберіть період бронювання</label>

                <DateRangePicker
                  bookedDates={bookedDates ?? []}
                  onSelect={(from, to) => {
                    setFieldValue('startDate', from);
                    setFieldValue('endDate', to);
                  }}
                />

                <ErrorMessage
                  className={css.error_message}
                  name="startDate"
                  component="p"
                />
                <ErrorMessage
                  className={css.error_message}
                  name="endDate"
                  component="p"
                />
              </div>

              <ul className={css.blok_fameli_city}>
                <li>
                  <label className={css.labels} htmlFor="deliveryCity">
                    Місто доставки
                  </label>
                  <Field
                    className={css.inputs}
                    name="deliveryCity"
                    placeholder="Ваше місто"
                  />
                  <ErrorMessage
                    className={css.error_message}
                    name="deliveryCity"
                    component="p"
                  />
                </li>

                <li>
                  <label className={css.labels} htmlFor="deliveryBranch">
                    Відділення Нової Пошти
                  </label>
                  <Field
                    className={css.inputs}
                    name="deliveryBranch"
                    placeholder="24"
                  />
                  <ErrorMessage
                    className={css.error_message}
                    name="deliveryBranch"
                    component="p"
                  />
                </li>
              </ul>

              <ul className={css.blok_button}>
                <li>
                  <span className={css.totalPrice}>Ціна: {totalPrice} грн</span>
                </li>
                <li>
                  <button
                    className={css.button_boking}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Зачекайте...' : 'Забронювати'}
                  </button>
                </li>
              </ul>

              {serverWarning && (
                <p className={css.serverWarning}>{serverWarning}</p>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
