'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

registerLocale('uk', uk);

type Props = {
  toolId: string;
  pricePerDay: number;
};

interface MyFormValues {
  userFirstname: string;
  userLastname: string;
  userPhone: string;
  startDate: Date | null;
  endDate: Date | null;
  deliveryCity: string;
  deliveryBranch: string;
}

export default function BookingForm({ toolId, pricePerDay }: Props) {
  const router = useRouter();
  const [serverWarning, setServerWarning] = useState<string | null>(null);

  const getBookingDays = (start: Date | null, end: Date | null): number => {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object({
    userFirstname: Yup.string()
      .trim()
      .min(2, 'Мінімум 2 символи')
      .max(50, 'Максимум 50 символів')
      .required('Вкажіть імʼя'),
    
    userLastname: Yup.string()
      .trim()
      .min(2, 'Мінімум 2 символи')
      .max(50, 'Максимум 50 символів')
      .required('Вкажіть прізвище'),
    
    userPhone: Yup.string()
      .transform((v) => (v ? v.replace(/\s/g, '') : v))
      .matches(/^\+?[0-9\s\-()]{7,20}$/, 'Невірний формат телефону')
      .required('Вкажіть номер телефону'),
    
    startDate: Yup.date()
      .nullable()
      .required('Оберіть дату початку')
      .min(today, 'Дата не може бути в минулому'),
    
    endDate: Yup.date()
      .nullable()
      .required('Оберіть дату завершення')
      .when(['startDate'], (values, schema) => {
    const [startDate] = values as [Date | null];

    if (!startDate) return schema;

    const nextDay = new Date(startDate);
    nextDay.setHours(0, 0, 0, 0);
    nextDay.setDate(nextDay.getDate() + 1);

    return schema.min(nextDay, 'Мінімум 1 день оренди');
  }),
    
    deliveryCity: Yup.string()
      .trim()
      .min(2, 'Мінімум 2 символи')
      .required('Вкажіть місто'),
    
    deliveryBranch: Yup.string()
      .trim()
      .min(1)
      .required('Вкажіть відділення'),
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
          const res = await fetch('http://localhost:3030/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              ...values,
              toolId,
              startDate: values.startDate?.toISOString().split('T')[0],
              endDate: values.endDate?.toISOString().split('T')[0],
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            if (data.code === 'TOOL_UNAVAILABLE' && data.nextAvailable) {
              setServerWarning(
                `Інструмент зайнятий. Найближчий вільний період: ${data.nextAvailable.start} — ${data.nextAvailable.end}`
              );
              return;
            }

            throw new Error('Сталася помилка бронювання');
          }

          router.push('/confirm/booking');
        } catch (err: any) {
          setServerWarning(err.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ setFieldValue, values, isSubmitting }) => {
        const bookingDays = getBookingDays(values.startDate, values.endDate);
        const totalPrice = bookingDays * pricePerDay;

        return (
          <Form className="max-w-xl space-y-4 border p-4 rounded">
            <h2 className="text-xl font-semibold">Підтвердження бронювання</h2>

            <Field name="userFirstname" placeholder="Імʼя" />
            <ErrorMessage
              name="userFirstname"
              component="p"
              className="text-red-600 text-sm"
            />

            <Field name="userLastname" placeholder="Прізвище" />
            <ErrorMessage
              name="userLastname"
              component="p"
              className="text-red-600 text-sm"
            />

            <Field name="userPhone" placeholder="+380..." />
            <ErrorMessage
              name="userPhone"
              component="p"
              className="text-red-600 text-sm"
            />

            <div className="grid grid-cols-2 gap-3">
              <DatePicker
                selected={values.startDate}
                onChange={(date: Date | null) =>
                  setFieldValue('startDate', date)
                }
                locale="uk"
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата початку"
              />
              <DatePicker
                selected={values.endDate}
                onChange={(date: Date | null) => setFieldValue('endDate', date)}
                locale="uk"
                dateFormat="dd.MM.yyyy"
                placeholderText="Дата завершення"
              />
            </div>

            <ErrorMessage
              name="startDate"
              component="p"
              className="text-red-600 text-sm"
            />
            <ErrorMessage
              name="endDate"
              component="p"
              className="text-red-600 text-sm"
            />

            <Field name="deliveryCity" placeholder="Місто доставки" />
            <ErrorMessage
              name="deliveryCity"
              component="p"
              className="text-red-600 text-sm"
            />

            <Field name="deliveryBranch" placeholder="Відділення / склад" />
            <ErrorMessage
              name="deliveryBranch"
              component="p"
              className="text-red-600 text-sm"
            />

            <div className="flex justify-between items-center pt-2">
              <span className="font-medium">
                Ціна: {totalPrice} грн
                {/* {bookingDays > 0 && (
                  <span className="text-sm text-gray-500">
                    {' '}
                    ({bookingDays} дн. × {pricePerDay} грн)
                  </span>
                )} */}
              </span>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Зачекайте...' : 'Забронювати'}
              </button>
            </div>

            {serverWarning && (
              <p className="text-orange-600 font-medium">{serverWarning}</p>
            )}
          </Form>
        );
      }}
    </Formik>
  );
}
