'use client';

import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { config } from '@/config';

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    message: string;
    user: {
        id: string;
        email: string;
    };
}

async function loginFn(credentials: LoginCredentials): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>(
        '/api/auth/login',
        credentials
    );
    return data;
}

export function useLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();

    return useMutation({
        mutationFn: loginFn,
        onSuccess: () => {
            const callbackUrl =
                searchParams.get(config.callbackUrlName) || '/';
            router.push(callbackUrl);
        },
    });
}
