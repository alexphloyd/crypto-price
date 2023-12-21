import { createApi } from '@reduxjs/toolkit/query/react';
import { authenticatedQuery } from '../base-queries/authenticated-query';

export const authApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: authenticatedQuery,
  endpoints: () => ({}),
});
