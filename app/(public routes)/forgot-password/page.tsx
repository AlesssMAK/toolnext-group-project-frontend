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
            setMessage('If this email exists, a reset link has been sent.');
        } catch {
            setMessage('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className={style.mainContent}>
            <div className={style.formSection}>
                <form onSubmit={handleSubmit} className={style.form}>
                <h1 className={style.formTitle}>Forgot password</h1>

                    <div className={style.formGroup}>
                        <input
                            className={style.input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>

                <button
                    type="submit"
                    className={style.submitButton}
                    disabled={isLoading}
                >
                {isLoading ? 'Sending...' : 'Send reset link'}
                </button>

                {message && <p className={style.infoText}>{message}</p>}
                </form>
            </div>
        </section>
    )
}