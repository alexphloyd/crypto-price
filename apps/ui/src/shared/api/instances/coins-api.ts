import { createApi } from '@reduxjs/toolkit/query/react';
import { coinsQuery } from '../base-queries/coins-query';

export const coinsApi = createApi({
  reducerPath: 'coins-api',
  baseQuery: coinsQuery,
  endpoints: () => ({}),
});
