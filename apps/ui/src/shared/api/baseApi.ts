import { createApi } from '@reduxjs/toolkit/query/react';
import { baseReauthQuery } from './baseQuery';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseReauthQuery,
  endpoints: () => ({}),
});
