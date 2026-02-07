'use client';

import { useState, FormEvent } from 'react';
import { useLogin } from '@/hooks/auth/useLogin';

export default function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { mutate: login, isPending, error } = useLogin();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login({ email, password });
    }

    const errorMessage =
        error && 'response' in error
            ? (error as any).response?.data?.message || 'Login failed'
            : error
              ? 'An unexpected error occurred'
              : null;

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Sign in
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                            autoComplete="email"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                            autoComplete="current-password"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="mt-2 flex h-10 items-center justify-center rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        {isPending ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
}
