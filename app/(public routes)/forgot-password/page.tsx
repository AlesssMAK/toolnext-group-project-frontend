'use client';

import { useState } from "react";
import { requestResetEmail } from "@/lib/api/auth";
import style from "./forgot-password.module.css";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setMessage('');
        try {
            await requestResetEmail(email);
            setMessage('Якщо обліковий запис з такою поштою існує, ми надішлемо лист із посиланням для відновлення.');
        } catch {
            setMessage('Не вдалося надіслати лист. Спробуйте ще раз трохи пізніше.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={style.mainContent}>
            <div className={style.formSection}>
                <form onSubmit={handleSubmit} className={style.form}>
                <h1 className={style.formTitle}>Відновлення пароля</h1>

                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ваша електронна пошта"
                            required
                        />
                    </div>

                <button
                    type="submit"
                    className={style.submitButton}
                    disabled={isLoading}
                >
                {isLoading ? 'Надсилаємо…' : 'Отримати посилання'}
                </button>

                {message && <p className={style.infoText}>{message}</p>}
                </form>
            </div>
        </section>
    )
}