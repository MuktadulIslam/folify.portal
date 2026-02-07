'use client';

import { useMutation } from '@tanstack/react-query';
import api from '@/lib/axios';

interface VerifyCredentials {
    username: string;
    password: string;
}

interface VerifyResponse {
    message: string;
    adminToken: string;
}

async function verifyFn(credentials: VerifyCredentials): Promise<VerifyResponse> {
    const { data } = await api.post<VerifyResponse>(
        '/api/auth/verify-system-admin',
        credentials
    );
    return data;
}

export function useVerifySystemAdmin() {
    return useMutation({
        mutationFn: verifyFn,
    });
}
