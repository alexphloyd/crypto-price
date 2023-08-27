import { baseApi } from '@app/shared/api';
import { SignUpDto, type VerifyUserInput } from '@dto';
import { type User } from '@prisma/client';
import { type VerifyRes } from '@api-types';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<User, SignUpDto>({
      query: (body) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body,
      }),
    }),

    verify: builder.mutation<VerifyRes, VerifyUserInput>({
      query: (body) => ({
        url: 'auth/verify',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { signUp, verify } = authApi.endpoints;
