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
            setMessage('Reset token is missing. Please open the link from your email again.')
            return;
        }

        if (password.length < 8) {
            setMessage('Password must be at least 8 characters.')
            return;
        }

        if (password !== confirm) {
            setMessage('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            await resetPassword(token, password);
            setMessage('Password updated successfully. Redirecting to login...');
            setTimeout(() => router.push('/login'), 1200);
        } catch {
            setMessage('Invalid or expired token. Please request a new reset link.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section className={style.mainContent}>
      <div className={style.formSection}>
        <form onSubmit={handleSubmit} className={style.form}>
          <h1 className={style.formTitle}>Reset password</h1>

          <div className={style.formGroup}>
            <input
              className={style.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
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
              placeholder="Confirm new password"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            className={style.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Reset password'}
          </button>

          {message && <p className={style.infoText}>{message}</p>}
        </form>
      </div>
    </section>
    );
}


// import Link from 'next/link';

// <Link href="/forgot-password">Forgot password?</Link>