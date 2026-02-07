'use client';

import { useState, FormEvent } from 'react';
import { useVerifySystemAdmin } from '@/hooks/auth/useVerifySystemAdmin';
import { useRegister } from '@/hooks/auth/useRegister';

export default function RegisterComponent() {
    // Step 1: System admin verification
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminToken, setAdminToken] = useState<string | null>(null);

    // Step 2: System registration
    const [systemName, setSystemName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const verify = useVerifySystemAdmin();
    const register = useRegister();

    function handleVerify(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        verify.mutate(
            { username: adminUsername, password: adminPassword },
            {
                onSuccess: (data) => {
                    setAdminToken(data.adminToken);
                },
            }
        );
    }

    function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!adminToken) return;
        register.mutate({ adminToken, systemName, email, phone, username, password });
    }

    const verifyError =
        verify.error && 'response' in verify.error
            ? (verify.error as any).response?.data?.message || 'Verification failed'
            : verify.error
              ? 'An unexpected error occurred'
              : null;

    const registerError =
        register.error && 'response' in register.error
            ? (register.error as any).response?.data?.message || 'Registration failed'
            : register.error
              ? 'An unexpected error occurred'
              : null;

    // Step 1: System Admin Authentication
    if (!adminToken) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        System Admin
                    </h1>
                    <p className="mb-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Verify your identity to register a new system
                    </p>

                    <form onSubmit={handleVerify} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="adminUsername"
                                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                Username
                            </label>
                            <input
                                id="adminUsername"
                                type="text"
                                required
                                value={adminUsername}
                                onChange={(e) => setAdminUsername(e.target.value)}
                                placeholder="System admin username"
                                className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                                autoComplete="off"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="adminPassword"
                                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                            >
                                Password
                            </label>
                            <input
                                id="adminPassword"
                                type="password"
                                required
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                placeholder="System admin password"
                                className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                                autoComplete="off"
                            />
                        </div>

                        {verifyError && (
                            <p className="text-sm text-red-600 dark:text-red-400">
                                {verifyError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={verify.isPending}
                            className="mt-2 flex h-10 items-center justify-center rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                        >
                            {verify.isPending ? 'Verifying...' : 'Verify Identity'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Step 3: Success - Credentials sent via email
    if (register.isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mb-4 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                            <svg
                                className="h-8 w-8 text-emerald-600 dark:text-emerald-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        System Created
                    </h1>
                    <p className="mb-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Login credentials have been sent to
                    </p>
                    <p className="mb-6 text-center text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {register.data?.user.email}
                    </p>
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-zinc-500 dark:text-zinc-400">System</span>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">{register.data?.system.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500 dark:text-zinc-400">Role</span>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">Super Admin</span>
                            </div>
                        </div>
                    </div>
                    <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
                        The client can now login using the credentials sent to their email.
                    </p>
                </div>
            </div>
        );
    }

    // Step 2: System Registration Form
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
            <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Register System
                </h1>

                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="systemName"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            System Name
                        </label>
                        <input
                            id="systemName"
                            type="text"
                            required
                            value={systemName}
                            onChange={(e) => setSystemName(e.target.value)}
                            placeholder="Your organization name"
                            className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Super Admin Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                            autoComplete="email"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="phone"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1234567890"
                            className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                            autoComplete="tel"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="username"
                            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="superadmin"
                            className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                            autoComplete="username"
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
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 6 characters"
                            className="h-10 rounded-lg border border-zinc-300 bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                            autoComplete="new-password"
                        />
                    </div>

                    {registerError && (
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {registerError}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={register.isPending}
                        className="mt-2 flex h-10 items-center justify-center rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        {register.isPending ? 'Creating System...' : 'Register System'}
                    </button>
                </form>
            </div>
        </div>
    );
}
