'use client';

import css from './BookingToolForm.module.css';
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

  const validationSchema = Yup.object({
    userFirstname: Yup.string().min(2).max(50).required('Вкажіть імʼя'),
    userLastname: Yup.string().min(2).max(50).required('Вкажіть прізвище'),
    userPhone: Yup.string()
      .matches(/^\+?[0-9\s\-()]{7,20}$/, 'Невірний формат телефону')
      .required('Вкажіть номер телефону'),
    startDate: Yup.date()
      .required('Оберіть дату початку')
      .min(new Date(), 'Дата не може бути в минулому'),
    endDate: Yup.date()
      .required('Оберіть дату завершення')
      .when('startDate', (startDate, schema) =>
        startDate
          ? schema.min(startDate, 'Дата завершення має бути пізніше')
          : schema
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
          const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/categories', {
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
          <div className={css.container}>
            <h2 className={`${css.titleBooking} text-xl font-semibold`}>
              Підтвердження бронювання
            </h2>
            <Form
              className={`${css.formBoking} max-w-xl space-y-4 border p-4 rounded`}
            >
              <ul className={css.blok_fameli_city}>
                <li>
                  <label className={css.labels} htmlFor="userFirstname">
                    Ім'я
                  </label>
                  <Field
                    className={css.inputs}
                    name="userFirstname"
                    placeholder="Ваше імʼя"
                  />
                  <ErrorMessage
                    className={`${css.error_message} text-red-600 text-sm`}
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
                    className={`${css.error_message} text-red-600 text-sm`}
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
                    className={`${css.error_message} text-red-600 text-sm`}
                    name="userPhone"
                    component="p"
                  />
                </li>
              </ul>

              <div className={`${css.blok_calendar} grid grid-cols-2 gap-3`}>
                <label className={css.labels}>Виберіть період бронювання</label>
                <ul>
                  <li>
                    <DatePicker
                      className={css.inputs}
                      selected={values.startDate}
                      onChange={(date: Date | null) =>
                        setFieldValue('startDate', date)
                      }
                      locale="uk"
                      dateFormat="dd.MM.yyyy"
                      placeholderText="Початкова дата"
                    />
                    <ErrorMessage
                      className={`${css.error_message} text-red-600 text-sm`}
                      name="startDate"
                      component="p"
                    />
                  </li>
                  <li>
                    <DatePicker
                      className={css.inputs}
                      selected={values.endDate}
                      onChange={(date: Date | null) =>
                        setFieldValue('endDate', date)
                      }
                      locale="uk"
                      dateFormat="dd.MM.yyyy"
                      placeholderText="Кінцева дата"
                    />
                    <ErrorMessage
                      className={`${css.error_message} text-red-600 text-sm`}
                      name="endDate"
                      component="p"
                    />
                  </li>
                </ul>
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
                    className={`${css.error_message} text-red-600 text-sm`}
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
                    className={`${css.error_message} text-red-600 text-sm`}
                    name="deliveryBranch"
                    component="p"
                  />
                </li>
              </ul>

              <ul
                className={`${css.blok_button} flex justify-between items-center pt-2`}
              >
                <li>
                  <span className="font-medium">
                    Ціна: {totalPrice} грн
                    {/* {bookingDays > 0 && (
                  <span className="text-sm text-gray-500">
                    {' '}
                    ({bookingDays} дн. × {pricePerDay} грн)
                  </span>
                )} */}
                  </span>
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
                <p className="text-orange-600 font-medium">{serverWarning}</p>
              )}
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}
