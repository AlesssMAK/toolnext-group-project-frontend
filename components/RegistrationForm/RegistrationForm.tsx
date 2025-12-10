"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css"


import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";
import { register, RegisterRequest } from "@/lib/api/clientApi";

export default function RegistrationForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  // Yup схема валідації
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(2, "Мінімум 2 символи")
      .required("Ім’я обов’язкове"),

    email: Yup.string()
      .email("Невірний формат email")
      .required("Email обов’язковий"),

    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Пароль обов’язковий"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Паролі не збігаються")
      .required("Підтвердження пароля обов’язкове"),
  });

  // Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
    
        const { username, email, password } = values;

        const payload: RegisterRequest = {
          username,
          email,
          password,
        };

        const res = await register(payload);

        if (res) {
          setUser(res);
          router.push("/");
        }
      } catch (err) {
        setError(
          (err as ApiError).response?.data?.error ??
            (err as ApiError).message ??
            "Oops... some error"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className={css.mainContent}>
      <form onSubmit={formik.handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Реєстрація</h1>

       
        <div className={css.formGroup}>
          <label htmlFor="username">Імʼя</label>
          <input
            id="username"
            type="text"
            name="username"
            className={`${css.input} ${formik.touched.username && formik.errors.username ? css.error : ''}`}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Ваше імʼя"
          />
          {formik.touched.username && formik.errors.username && (
            <p className={css.errorText}>{formik.errors.username}</p>
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
          <button type="submit" className={css.submitButton} disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Завантаження..." : "Зареєструватись"}
          </button>
        </div>

        <div>
          <p className={css.loginLink}>Вже маєте аккаунт? <a href="/auth/login">Вхід</a></p>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}