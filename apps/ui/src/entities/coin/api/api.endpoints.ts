import { cryptoApi } from '@app/shared/api/instances/crypto-api';
import { createQueryString } from '@app/shared/lib';
import { type CoinMarketOverview } from '../model/types/core';
import { type GetMarketsParams } from './api.interface';

export const coinApi = cryptoApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query<CoinMarketOverview[], GetMarketsParams>({
      query: (params) => ({
        url: createQueryString({ url: 'coins/markets', params }),
        method: 'GET',
      }),
    }),
  }),
});
