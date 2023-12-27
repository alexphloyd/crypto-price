import { cryptoApi } from '@app/shared/api/instances/crypto-api';
import { createQueryString } from '@app/shared/lib';
import { MarketCategory, type MarketOverview } from '../model/types/core';
import { type GetMarketsParams } from './api.interface';

export const coinApi = cryptoApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarkets: builder.query<MarketOverview[], GetMarketsParams>({
      query: (params) => ({
        url: createQueryString({ url: 'coins/markets', params }),
        method: 'GET',
      }),
    }),

    getCategories: builder.query<MarketCategory[], void>({
      query: () => ({
        url: createQueryString({ url: 'coins/categories' }),
        method: 'GET',
      }),
    }),
  }),
});

export const { getMarkets, getCategories } = coinApi.endpoints;
