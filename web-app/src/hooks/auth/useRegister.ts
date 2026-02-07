'use client';

import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

interface RegisterCredentials {
    adminToken: string;
    systemName: string;
    email: string;
    phone: string;
    username: string;
    password: string;
}

interface RegisterResponse {
    message: string;
    user: {
        id: string;
        email: string;
        username: string;
        role: string;
    };
    system: {
        id: string;
        name: string;
    };
}

async function registerFn(credentials: RegisterCredentials): Promise<RegisterResponse> {
    // Step 1: Register the system on the backend
    const { data } = await api.post<RegisterResponse>(
        '/api/auth/register',
        credentials
    );

    // Step 2: Send credentials email to the client
    const loginUrl = `${window.location.origin}/accounts/login`;
    await fetch('/api/send-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            systemName: credentials.systemName,
            email: credentials.email,
            username: credentials.username,
            password: credentials.password,
            loginUrl,
        }),
    });

    return data;
}

export function useRegister() {
    return useMutation({
        mutationFn: registerFn,
    });
}
