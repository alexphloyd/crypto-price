import { createApi } from '@reduxjs/toolkit/query/react';
import { baseReauthQuery } from './base-query';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseReauthQuery,
  endpoints: () => ({}),
});
