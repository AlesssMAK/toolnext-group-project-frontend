"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import css from "./LoginForm.module.css"

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);

  const setUser = useAuthStore((state) => state.setUser);

  const validate = (email: string, password: string) => {
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = "Email обов’язковий";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Некоректний email";

    if (!password) newErrors.password = "Пароль обов’язковий";
    else if (password.length < 6) newErrors.password = "Мінімум 6 символів";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData) as LoginRequest;

    // 1. Валідація
    const validationErrors = validate(formValues.email, formValues.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      // 2. API call
      const user = await login(formValues);

      // 3. Save user to store
      setUser(user);

      // 4. Redirect to return path
      const redirectTo = searchParams.get("redirectTo") || "/";
      router.push(redirectTo);
    } catch (err) {
      const msg =
        (err as ApiError).response?.data?.error ||
        (err as ApiError).message ||
        "Сталася помилка";

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Вхід</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Пошта</label>
          <input id="email" type="email" name="email" placeholder="Ваша пошта" className={css.input} />
          {errors.email && <p className={css.error}>{errors.email}</p>}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            placeholder="*******"
          />
          {errors.password && <p className={css.error}>{errors.password}</p>}
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton} disabled={loading}>
            {loading ? "Завантаження..." : "Увійти"}
          </button>
        </div>
        <div>
          <p className={css.loginLink}>
            Не маєте аккаунту? <a href="/auth/register">Реєстрація</a>
          </p>
        </div>
      </form>
    </main>
  );
}
