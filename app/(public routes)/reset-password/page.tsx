'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { resetPassword } from "@/lib/api/auth";

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
        <section>
            <h1>Reset password</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                    required
                    minLength={8}
                />

                <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    minLength={8}
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Reset password'}
                </button>

            </form>

            {message && <p>{ message}</p>}
        </section>
    );
}


// import Link from 'next/link';

// <Link href="/forgot-password">Forgot password?</Link>