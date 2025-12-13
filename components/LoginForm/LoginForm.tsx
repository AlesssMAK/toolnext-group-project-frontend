'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { login, LoginRequest } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';
import css from './LoginForm.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Некоректний email')
      .required('Email обов’язковий'),
    password: Yup.string()
      .min(6, 'Мінімум 6 символів')
      .required('Пароль обов’язковий'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload: LoginRequest = {
          email: values.email,
          password: values.password,
        };
        const user = await login(payload);
        setUser(user);
        toast.success(`Вітаю, ${user.username}! Ви увійшли 👌`);
        const redirectTo = searchParams.get('redirectTo') || '/';
        router.push(redirectTo);
      } catch (err) {
        const msg =
          (err as ApiError).response?.data?.error ??
          (err as ApiError).message ??
          'Сталася помилка';
        setError(msg);
        toast.error(msg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className={css.mainContent}>
      <div className="container">
        <div className={css.wrapper}>
          <div className={css.formSection}>
            <form onSubmit={formik.handleSubmit} className={css.form}>
              <h1 className={css.formTitle}>Вхід</h1>

              <div className={css.formGroup}>
                <label htmlFor="email">Пошта</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`${css.input} ${formik.touched.email && formik.errors.email ? css.error : ''}`}
                  placeholder="Ваша пошта"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className={css.errorText}>{formik.errors.email}</p>
                )}
              </div>

              <div className={css.formGroup}>
                <label htmlFor="password">Пароль</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`${css.input} ${formik.touched.password && formik.errors.password ? css.error : ''}`}
                  placeholder="*******"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className={css.errorText}>{formik.errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className={css.submitButton}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Завантаження...' : 'Увійти'}
              </button>

              <p className={css.loginLink}>
                Не маєте аккаунту? <a href="/auth/register">Реєстрація</a>
              </p>
              {error && <p className={css.error}>{error}</p>}
            </form>
          </div>
          <div className={css.imageSection}></div>
        </div>
      </div>
    </main>
  );
}
