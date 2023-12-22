import { cryptoApi } from '@app/shared/api/instances/crypto-api';
import { createQueryString } from '@app/shared/lib';

export const coinApi = cryptoApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query({
      query: (params) => ({
        url: createQueryString({ url: 'coins/markets', params }),
        method: 'POST',
      }),
    }),
  }),
});
