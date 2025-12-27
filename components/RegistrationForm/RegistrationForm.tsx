'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';

import { ApiError } from '@/app/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);

  // Yup схема валідації
  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'Мінімум 2 символи').required('Ім’я обов’язкове'),

    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Невірний формат email')
      // .email('Невірний формат email')
      .required('Email обов’язковий'),

    password: Yup.string()
      .min(6, 'Мінімум 6 символів')
      .required('Пароль обов’язковий'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Паролі не збігаються')
      .required('Підтвердження пароля обов’язкове'),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { name, email, password, confirmPassword } = values;

        const payload: RegisterRequest = {
          name,
          email,
          password,
          confirmPassword,
        };

        const res = await register(payload);
        setUser(res.user);
        toast.success(`Вітаю! Аккаунт створено 🎉`);

        setTimeout(() => {
          router.push('/');
        }, 1200);
      } catch (err) {
        const apiError = err as ApiError;

        if (apiError.response?.status === 409) {
          toast.error('Користувач з таким email вже існує');
        } else {
          toast.error('Перевірте правильність введених даних');
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className={css.mainContent}>
      <div className={css.formSection}>
        <form onSubmit={formik.handleSubmit} className={css.form}>
          <h1 className={css.formTitle}>Реєстрація</h1>

          <div className={css.formGroup}>
            <label htmlFor="name">Імʼя</label>
            <input
              id="name"
              type="text"
              name="name"
              className={`${css.input} ${formik.touched.name && formik.errors.name ? css.error : ''}`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше імʼя"
            />
            {formik.touched.name && formik.errors.name && (
              <p className={css.errorText}>{formik.errors.name}</p>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="email">Пошта</label>
            <input
              id="email"
              type="email"
              name="email"
              className={`${css.input} ${formik.touched.email && formik.errors.email ? css.error : ''}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваша пошта"
            />
            {formik.touched.email && formik.errors.email && (
              <p className={css.errorText}>{formik.errors.email}</p>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              name="password"
              className={`${css.input} ${formik.touched.password && formik.errors.password ? css.error : ''}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="*******"
            />
            {formik.touched.password && formik.errors.password && (
              <p className={css.errorText}>{formik.errors.password}</p>
            )}
          </div>

          <div className={css.formGroup}>
            <label htmlFor="confirmPassword">Підтвердіть пароль</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={`${css.input} ${formik.touched.confirmPassword && formik.errors.confirmPassword ? css.error : ''}`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="*******"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className={css.errorText}>{formik.errors.confirmPassword}</p>
              )}
          </div>

          <div>
            <button
              type="submit"
              className={css.submitButton}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Завантаження...' : 'Зареєструватись'}
            </button>
          </div>

          <div>
            <p className={css.loginLink}>
              Вже маєте аккаунт? <a href="/auth/login">Вхід</a>
            </p>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
