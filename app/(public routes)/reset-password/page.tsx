'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { resetPassword } from "@/lib/api/auth";
import style from "./reset-password.module.css";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = useMemo(() => searchParams.get('token') || '', [searchParams]);

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        if (!token) {
            setMessage('Посилання недійсне або застаріле. Спробуйте відновити пароль ще раз.')
            return;
        }

        if (password.length < 8) {
            setMessage('Пароль має містити щонайменше 8 символів.')
            return;
        }

        if (password !== confirm) {
            setMessage('Паролі не збігаються. Перевірте, будь ласка.');
            return;
        }

        setIsLoading(true);

        try {
            await resetPassword(token, password);
            setMessage('Готово! Пароль оновлено. Переходимо до входу…');
            setTimeout(() => router.push('/auth/login'), 1200);
        } catch {
            setMessage('Посилання недійсне або застаріле. Запросіть нове для відновлення пароля.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section className={style.mainContent}>
      <div className={style.formSection}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className={style.formTitle}>Створіть новий пароль</h1>

          <div className={style.formGroup}>
            <input
              className={style.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Новий пароль"
              required
              minLength={8}
            />
          </div>

          <div className={style.formGroup}>
            <input
              className={style.input}
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Повторіть пароль"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className={style.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Зберігаємо…' : 'Змінити пароль'}
          </button>

          {message && <p className={style.infoText}>{message}</p>}
        </form>
      </div>
    </section>
    );
}

