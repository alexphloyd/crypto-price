import { LoginSchema } from '@dto/auth/schemas/login.schema';
import { z } from 'zod';
import { coreApi } from '@app/shared/api';
import { type User } from '@prisma/client';
import { type SessionResponse, type LoginResponse, type VerifyResponse } from '@api-types/domain/auth/types';
import { SignUpSchema } from '@dto/auth/schemas/sign-up.schema';
import { VerificationSchema } from '@dto/auth/schemas/verification.schema';

export const authApi = coreApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<Awaited<User>, z.infer<typeof SignUpSchema>>({
      query: (body) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body,
      }),
    }),

    verify: builder.mutation<Awaited<VerifyResponse>, z.infer<typeof VerificationSchema>>({
      query: (body) => ({
        url: 'auth/verify',
        method: 'PUT',
        body,
      }),
    }),

    login: builder.query<Awaited<LoginResponse>, z.infer<typeof LoginSchema>>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),

    session: builder.query<Awaited<SessionResponse>, void>({
      query: () => ({
        url: 'auth/session',
        method: 'GET',
      }),
    }),
  }),
});

export const { signUp, verify, login, session } = authApi.endpoints;
