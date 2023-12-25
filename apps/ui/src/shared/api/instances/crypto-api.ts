import { createApi } from '@reduxjs/toolkit/query/react';
import { cryptoQuery } from '../queries/crypto-query';

export const cryptoApi = createApi({
  reducerPath: 'crypto-api',
  baseQuery: cryptoQuery,
  endpoints: () => ({}),
});
