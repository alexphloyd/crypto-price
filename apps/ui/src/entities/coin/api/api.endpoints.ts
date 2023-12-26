import { cryptoApi } from '@app/shared/api/instances/crypto-api';
import { createQueryString } from '@app/shared/lib';
import { type CoinMarketsOverview } from '../model/types/core';
import { type GetMarketsParams } from './api.interface';

export const coinApi = cryptoApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query<CoinMarketsOverview[], GetMarketsParams>({
      query: (params) => ({
        url: createQueryString({ url: 'coins/markets', params }),
        method: 'GET',
      }),
    }),
  }),
});

export const { getMarkets } = coinApi.endpoints;
