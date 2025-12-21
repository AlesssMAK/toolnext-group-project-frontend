'use client';

import { useState } from "react";
import { requestResetEmail } from "@/lib/api/auth";

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
        <section>
            <h1>Forgot password</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send reset link'} 
                </button>
            </form>

            {message && <p>{message}</p>}
        </section>
    )
}