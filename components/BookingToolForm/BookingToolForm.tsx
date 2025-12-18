'use client';

import React, { useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import styles from './BookingToolForm.module.css';

export const bookingSchema = Yup.object({
  firstName: Yup.string().min(2).max(50).required(),
  lastName: Yup.string().min(2).max(50).required(),
  phone: Yup.string().matches(/^\+38\d{9}$/).required(),
  startDate: Yup.date().required(),
  endDate: Yup.date().required().min(Yup.ref('startDate')),
  deliveryCity: Yup.string().min(2).max(100).required(),
  deliveryBranch: Yup.string().min(1).max(200).required(),
});

const initialValues={
          firstName: '',
          lastName: '',
          phone: '',
          startDate: '',
          endDate: '',
          deliveryCity: '',
          deliveryBranch: ''
        }

// const BookingToolPage = () => {
//   const router = useRouter();
//   type BookingValues = typeof initialValues;

//   const handleSubmit = async (values: BookingValues) => {
//     console.log(values);
//   };

//   const pricePerDay = 500;

//   return (
//   <section className={styles.section}>
//     <div className={styles.container}>
//       <div className={styles.title}>
//         <h2>Підтвердження бронювання</h2>
//       </div>
//         <Formik
          
//         initialValues={initialValues}
//         validationSchema={bookingSchema}
//         onSubmit={handleSubmit}
//         >

//           {({ values }) => {
//             const start = values.startDate ? new Date(values.startDate) : null;
//             const end = values.endDate ? new Date(values.endDate) : null;
//             let totalPrice = 0;

//             if (start && end && end > start) {
//               const diffTime = end.getTime() - start.getTime();
//               const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//               totalPrice = diffDays * pricePerDay;
//             }

//             return (
//               <Form className={styles.form}>
//                 <ul className={styles.list}>
//                   <li className={styles.item}>
//                     <label className={styles.label} htmlFor="firstName">Ім’я</label>
//                     <Field className={styles.field} id="firstName" name="firstName" />
//                     <ErrorMessage name="firstName" component="div" className="error" />
//                   </li>

//                   <li className={styles.item}>
//                     <label className={styles.label} htmlFor="lastName">Прізвище</label>
//                     <Field className={styles.field} id="lastName" name="lastName" placeholder="Ваше прізвище" />
//                     <ErrorMessage name="lastName" component="div" className="error" />
//                   </li>
//                 </ul>
//                 {/* phone */}
//                 <ul className={styles.listphone}>
//                   <li className={styles.item}>
//                     <label className={styles.label} htmlFor="phone">Номер телефону</label>
//                     <Field className={styles.field} id="phone" name="phone" placeholder="+38XXXXXXXXX" />
//                     <ErrorMessage name="phone" component="div" className="error" />
//                   </li>
//                 </ul>
 
//                 <ul className={styles.list}>
//                   <li className={styles.item}>
//                     <label className={styles.label} htmlFor="startDate">Початкова дата</label>
//                     <Field className={styles.field} id="startDate" name="startDate" type="date" />
//                     <ErrorMessage name="startDate" component="div" className="error" />
//                   </li>

//                   <li className={styles.item}>
//                     <label className={styles.label} htmlFor="endDate">Кінцева дата</label>
//                     <Field className={styles.field} id="endDate" name="endDate" type="date" />
//                     <ErrorMessage name="endDate" component="div" className="error" />
//                   </li>
//                 </ul>

//                 <ul className={styles.list}>
//                   <li className={styles.item}>
//                     <label className={styles.label} htmlFor="deliveryCity">Місто доставки</label>
//                     <Field className={styles.field} id="deliveryCity" name="deliveryCity" placeholder="Ваше місто" />
//                     <ErrorMessage name="deliveryCity" component="div" className="error" />
//                   </li>

//                   <li className={styles.item}>
//                     <label className={styles.label} htmlFor="deliveryBranch">Відділення Нової Пошти</label>
//                     <Field className={styles.field} id="deliveryBranch" name="deliveryBranch" placeholder="24" />
//                     <ErrorMessage name="deliveryBranch" component="div" className="error" />
//                   </li>
//                 </ul>
            
//                 <div className={styles.priceBlock}>
//                   <strong className={styles.price}>Ціна:{totalPrice > 0 ? `${totalPrice} грн` : ''}</strong>

//                   <button className={styles.priceButton} type="submit" onClick={() => router.push('/')}>Забронювати</button>
//                   </div>
//               </Form>
//             );
//           }}
//       </Formik>
//       </div>
//       </section>
//   );
// };


// export default BookingToolPage;


const BookingToolPage = () => {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const pricePerDay = 500;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookingSchema.validate(values, { abortEarly: false });
      setErrors({});
      setLoading(true);

      const start = values.startDate ? new Date(values.startDate) : null;
      const end = values.endDate ? new Date(values.endDate) : null;
      let totalPrice = 0;
      if (start && end && end > start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalPrice = diffDays * pricePerDay;
      }

      console.log('Дані форми:', values, 'Ціна:', totalPrice);

      //  await axios.post('/api/book', { ...values, totalPrice });

      router.push('/BookingConfirmation');
    } catch (err: any) {
      if (err.inner) {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((e: any) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const start = values.startDate ? new Date(values.startDate) : null;
  const end = values.endDate ? new Date(values.endDate) : null;
  let totalPrice = 0;
  if (start && end && end > start) {
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    totalPrice = diffDays * pricePerDay;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Підтвердження бронювання</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <label className={styles.label} htmlFor="firstName">Ім’я</label>
              <input className={styles.field} id="firstName" name="firstName" value={values.firstName} onChange={handleChange} />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
            </li>

            <li className={styles.item}>
              <label className={styles.label} htmlFor="lastName">Прізвище</label>
              <input className={styles.field} id="lastName" name="lastName" value={values.lastName} onChange={handleChange} />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
            </li>
          </ul>

          <ul className={styles.listphone}>
            <li className={styles.item}>
              <label className={styles.label} htmlFor="phone">Номер телефону</label>
              <input className={styles.field} id="phone" name="phone" value={values.phone} onChange={handleChange} />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </li>
          </ul>

          <ul className={styles.list}>
            <li className={styles.item}>
              <label className={styles.label} htmlFor="startDate">Початкова дата</label>
              <input className={styles.field} id="startDate" name="startDate" type="date" value={values.startDate} onChange={handleChange} />
              {errors.startDate && <div className="error">{errors.startDate}</div>}
            </li>

            <li className={styles.item}>
              <label className={styles.label} htmlFor="endDate">Кінцева дата</label>
              <input className={styles.field} id="endDate" name="endDate" type="date" value={values.endDate} onChange={handleChange} />
              {errors.endDate && <div className="error">{errors.endDate}</div>}
            </li>
          </ul>

          <ul className={styles.list}>
            <li className={styles.item}>
              <label className={styles.label} htmlFor="deliveryCity">Місто доставки</label>
              <input className={styles.field} id="deliveryCity" name="deliveryCity" value={values.deliveryCity} onChange={handleChange} />
              {errors.deliveryCity && <div className="error">{errors.deliveryCity}</div>}
            </li>

            <li className={styles.item}>
              <label className={styles.label} htmlFor="deliveryBranch">Відділення Нової Пошти</label>
              <input className={styles.field} id="deliveryBranch" name="deliveryBranch" value={values.deliveryBranch} onChange={handleChange} />
              {errors.deliveryBranch && <div className="error">{errors.deliveryBranch}</div>}
            </li>
          </ul>

          <div className={styles.priceBlock}>
            <strong className={styles.price}>Ціна: {totalPrice > 0 ? `${totalPrice} грн` : ''}</strong>
          </div>

          <button className={styles.priceButton} type="submit" disabled={loading}>
            {loading ? 'Завантаження...' : 'Забронювати'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingToolPage;

