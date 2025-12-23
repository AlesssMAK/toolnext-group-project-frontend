// 'use client';

// import css from './BookingToolForm.module.css';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import DatePicker, { registerLocale } from 'react-datepicker';
// import { uk } from 'date-fns/locale';
// import 'react-datepicker/dist/react-datepicker.css';

// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// registerLocale('uk', uk);

// type Props = {
//   toolId: string;
//   pricePerDay: number;
// };

// interface MyFormValues {
//   userFirstname: string;
//   userLastname: string;
//   userPhone: string;
//   startDate: Date | null;
//   endDate: Date | null;
//   deliveryCity: string;
//   deliveryBranch: string;
// }

// export default function BookingForm({ toolId, pricePerDay }: Props) {
//   const router = useRouter();
//   const [serverWarning, setServerWarning] = useState<string | null>(null);

//   const getBookingDays = (start: Date | null, end: Date | null): number => {
//     if (!start || !end) return 0;

//     const startDate = new Date(start);
//     const endDate = new Date(end);

//     const diffTime = endDate.getTime() - startDate.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     return diffDays > 0 ? diffDays : 0;
//   };

//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   const validationSchema = Yup.object({
//     userFirstname: Yup.string().min(2).max(50).required('Вкажіть імʼя'),
//     userLastname: Yup.string().min(2).max(50).required('Вкажіть прізвище'),
//     userPhone: Yup.string()
//       .matches(/^\+?[0-9\s\-()]{7,20}$/, 'Невірний формат телефону')
//       .required('Вкажіть номер телефону'),

//     startDate: Yup.date()
//     .nullable()
//     .typeError('Вкажіть коректну дату початку')
//     .required('Оберіть дату початку')
//     .min(startOfToday, 'Дата не може бути в минулому'),

//   endDate: Yup.date()
//     .nullable()
//     .typeError('Вкажіть коректну дату завершення')
//     .required('Оберіть дату завершення')
//     .test('is-after-start', 'Дата завершення має бути пізніше за початок', function (value) {
//       const { startDate } = this.parent;
//       if (!startDate || !value) return true;
//       return value >= startDate;
//     }),
//     deliveryCity: Yup.string().min(2).required('Вкажіть місто'),
//     deliveryBranch: Yup.string().min(1).required('Вкажіть відділення'),
//   });

//   return (
//     <Formik<MyFormValues>
//       initialValues={{
//         userFirstname: '',
//         userLastname: '',
//         userPhone: '',
//         startDate: null,
//         endDate: null,
//         deliveryCity: '',
//         deliveryBranch: '',
//       }}
//       validationSchema={validationSchema}
//       onSubmit={async (values, { setSubmitting }) => {
//         setServerWarning(null);

//         try {
//           const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/bookings', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: 'include',
//             body: JSON.stringify({
//               ...values,
//               toolId,
//               startDate: values.startDate?.toISOString().split('T')[0],
//               endDate: values.endDate?.toISOString().split('T')[0],
//             }),
//           });

//           const data = await res.json();

//           if (!res.ok) {
//             if (data.message?.includes('booked')) {
//               setServerWarning('Інструмент вже зайнятий на вибрані дати');
//               return;
//             }
//             setServerWarning(data.message || 'Сталася помилка бронювання');
//             return;
//           }

//           router.push('/confirm/booking');
//         } catch (err: any) {
//           setServerWarning(err.message);
//         } finally {
//           setSubmitting(false);
//         }
//       }}
//     >
//       {({ setFieldValue, values, isSubmitting }) => {
//         const bookingDays = getBookingDays(values.startDate, values.endDate);
//         const totalPrice = bookingDays * pricePerDay;

//         return (
//           <div className={css.container}>
//             <h2 className={`${css.titleBooking} text-xl font-semibold`}>
//               Підтвердження бронювання
//             </h2>
//             <Form
//               className={`${css.formBoking} max-w-xl space-y-4 border p-4 rounded`}
//             >
//               <ul className={css.blok_fameli_city}>
//                 <li>
//                   <label className={css.labels} htmlFor="userFirstname">
//                     Ім'я
//                   </label>
//                   <Field
//                     className={css.inputs}
//                     name="userFirstname"
//                     placeholder="Ваше імʼя"
//                   />
//                   <ErrorMessage
//                     className={`${css.error_message} text-red-600 text-sm`}
//                     name="userFirstname"
//                     component="p"
//                   />
//                 </li>
//                 <li>
//                   <label className={css.labels} htmlFor="userLastname">
//                     Прізвище
//                   </label>
//                   <Field
//                     className={css.inputs}
//                     name="userLastname"
//                     placeholder="Прізвище"
//                   />
//                   <ErrorMessage
//                     className={`${css.error_message} text-red-600 text-sm`}
//                     name="userLastname"
//                     component="p"
//                   />
//                 </li>
//               </ul>

//               <ul className={css.blok_phone}>
//                 <li>
//                   <label className={css.labels} htmlFor="userPhone">
//                     Номер телефону
//                   </label>
//                   <Field
//                     className={css.inputs_phone}
//                     name="userPhone"
//                     placeholder="+38 (XXX) XXX XX XX"
//                   />
//                   <ErrorMessage
//                     className={`${css.error_message} text-red-600 text-sm`}
//                     name="userPhone"
//                     component="p"
//                   />
//                 </li>
//               </ul>

//               <div className={`${css.blok_calendar} grid grid-cols-2 gap-3`}>
//                 <label className={css.labels}>Виберіть період бронювання</label>
//                 <ul>
//                   <li>
//                     <DatePicker
//                       className={css.inputs}
//                       selected={values.startDate}
//                       onChange={(date: Date | null) =>
//                         setFieldValue('startDate', date)
//                       }
//                       locale="uk"
//                       dateFormat="dd.MM.yyyy"
//                       placeholderText="Початкова дата"
//                     />
//                     <ErrorMessage
//                       className={`${css.error_message} text-red-600 text-sm`}
//                       name="startDate"
//                       component="p"
//                     />
//                   </li>
//                   <li>
//                     <DatePicker
//                       className={css.inputs}
//                       selected={values.endDate}
//                       onChange={(date: Date | null) =>
//                         setFieldValue('endDate', date)
//                       }
//                       locale="uk"
//                       dateFormat="dd.MM.yyyy"
//                       placeholderText="Кінцева дата"
//                     />
//                     <ErrorMessage
//                       className={`${css.error_message} text-red-600 text-sm`}
//                       name="endDate"
//                       component="p"
//                     />
//                   </li>
//                 </ul>
//               </div>

//               <ul className={css.blok_fameli_city}>
//                 <li>
//                   <label className={css.labels} htmlFor="deliveryCity">
//                     Місто доставки
//                   </label>
//                   <Field
//                     className={css.inputs}
//                     name="deliveryCity"
//                     placeholder="Ваше місто"
//                   />
//                   <ErrorMessage
//                     className={`${css.error_message} text-red-600 text-sm`}
//                     name="deliveryCity"
//                     component="p"
//                   />
//                 </li>
//                 <li>
//                   <label className={css.labels} htmlFor="deliveryBranch">
//                     Відділення Нової Пошти
//                   </label>
//                   <Field
//                     className={css.inputs}
//                     name="deliveryBranch"
//                     placeholder="24"
//                   />
//                   <ErrorMessage
//                     className={`${css.error_message} text-red-600 text-sm`}
//                     name="deliveryBranch"
//                     component="p"
//                   />
//                 </li>
//               </ul>

//               <ul
//                 className={`${css.blok_button} flex justify-between items-center pt-2`}
//               >
//                 <li>
//                   <span className="font-medium">
//                     Ціна: {totalPrice} грн
//                     {/* {bookingDays > 0 && (
//                   <span className="text-sm text-gray-500">
//                     {' '}
//                     ({bookingDays} дн. × {pricePerDay} грн)
//                   </span>
//                 )} */}
//                   </span>
//                 </li>
//                 <li>
//                   <button
//                     className={css.button_boking}
//                     type="submit"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Зачекайте...' : 'Забронювати'}
//                   </button>
//                 </li>
//               </ul>

//               {serverWarning && (
//                 <p className="text-orange-600 font-medium">{serverWarning}</p>
//               )}
//             </Form>
//           </div>
//         );
//       }}
//     </Formik>
//   );
// }

'use client';

import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingToolForm.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import DateRangePicker from '../DateRangePicker/DateRangePicker';
import { createBooking } from '@/lib/api/clientApi';

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

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 0;
  };

  const validationSchema = Yup.object({
    userFirstname: Yup.string().min(2).required('Вкажіть імʼя'),
    userLastname: Yup.string().min(2).required('Вкажіть прізвище'),
    userPhone: Yup.string()
      .matches(/^\+?[0-9\s\-()]{7,20}$/, 'Невірний формат телефону')
      .required('Вкажіть номер телефону'),

    startDate: Yup.date()
      .nullable()
      .typeError('Вкажіть коректну дату початку')
      .required('Оберіть дату початку')
      .min(new Date(), 'Дата не може бути в минулому'),

    endDate: Yup.date()
      .nullable()
      .typeError('Вкажіть коректну дату завершення')
      .required('Оберіть дату завершення')
      .test(
        'is-after-start',
        'Дата завершення має бути пізніше за початок',
        function (value) {
          const { startDate } = this.parent;
          if (!startDate || !value) return true;
          return value >= startDate;
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
          if (!values.startDate || !values.endDate) {
            throw new Error('Оберіть дати бронювання');
          }
          await createBooking({
            ...values,
            toolId,
            startDate: values.startDate?.toISOString().split('T')[0],
            endDate: values.endDate?.toISOString().split('T')[0],
          });

          router.push('/confirm/booking');
        } catch (err: any) {
          setServerWarning(err.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => {
        const bookingDays = getBookingDays(values.startDate, values.endDate);
        const totalPrice = bookingDays * pricePerDay;

        return (
          <section className={css.section}>
            <div className="container">
              <div className={css.container}>
                <h2 className={css.titleBooking}>Підтвердження бронювання</h2>

                <Form className={css.formBoking}>
                  {/* Імʼя + Прізвище */}
                  <ul className={css.blok_fameli_city}>
                    <li>
                      <label className={css.labels}>Імʼя</label>
                      <Field className={css.inputs} name="userFirstname" />
                      <ErrorMessage name="userFirstname" component="p" />
                    </li>
                    <li>
                      <label className={css.labels}>Прізвище</label>
                      <Field className={css.inputs} name="userLastname" />
                      <ErrorMessage name="userLastname" component="p" />
                    </li>
                  </ul>

                  {/* Телефон */}
                  <ul className={css.blok_phone}>
                    <li>
                      <label className={css.labels}>Номер телефону</label>
                      <Field className={css.inputs_phone} name="userPhone" />
                      <ErrorMessage name="userPhone" component="p" />
                    </li>
                  </ul>

                  {/* КАЛЕНДАР */}
                  <div className={css.blok_calendar}>
                    <label className={css.labels}>
                      Виберіть період бронювання
                    </label>
                    <DateRangePicker
                      onSelect={(from, to) => {
                        setFieldValue('startDate', from);
                        setFieldValue('endDate', to);
                      }}
                    />

                    <ErrorMessage name="startDate" component="p" />
                    <ErrorMessage name="endDate" component="p" />
                  </div>

                  {/* Доставка */}
                  <ul className={css.blok_fameli_city}>
                    <li>
                      <label className={css.labels}>Місто доставки</label>
                      <Field className={css.inputs} name="deliveryCity" />
                      <ErrorMessage name="deliveryCity" component="p" />
                    </li>
                    <li>
                      <label className={css.labels}>
                        Відділення Нової Пошти
                      </label>
                      <Field className={css.inputs} name="deliveryBranch" />
                      <ErrorMessage name="deliveryBranch" component="p" />
                    </li>
                  </ul>

                  {/* Ціна + кнопка */}

                  <div className={css.blok_button}>
                    <span>
                      Ціна: {totalPrice} грн
                      {bookingDays > 0 && ` (${bookingDays} дн.)`}
                    </span>

                    <button
                      className={css.button_boking}
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Забронювати
                    </button>
                  </div>

                  {serverWarning && <p>{serverWarning}</p>}
                </Form>
              </div>
            </div>
          </section>
        );
      }}
    </Formik>
  );
}
