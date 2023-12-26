import { createApi } from '@reduxjs/toolkit/query/react';
import { coreQuery } from '../queries/core-query';

export const coreApi = createApi({
  reducerPath: 'core-api',
  baseQuery: coreQuery,
  endpoints: () => ({}),
});
