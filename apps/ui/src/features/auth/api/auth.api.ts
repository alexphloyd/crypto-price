import { z } from 'zod';
import { baseApi } from '@app/shared/api';
import { type User } from '@prisma/client';
import { type VerifyRes } from '@api-types';
import { SignUpSchema } from '@dto/auth/schemas/sign-up.schema';
import { VerificationSchema } from '@dto/auth/schemas/verification.schema';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, z.infer<typeof SignUpSchema>>({
      query: (body) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body,
      }),
    }),

    verify: builder.mutation<VerifyRes, z.infer<typeof VerificationSchema>>({
      query: (body) => ({
        url: 'auth/verify',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { signUp, verify } = authApi.endpoints;
