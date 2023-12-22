import { createApi } from '@reduxjs/toolkit/query/react';
import { coinsQuery } from '../queries/coins-query';

export const cryptoApi = createApi({
  reducerPath: 'crypto-api',
  baseQuery: coinsQuery,
  endpoints: () => ({}),
});
