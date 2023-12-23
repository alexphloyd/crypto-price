import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV_CONFIG } from '@app/shared/config';

export const coinsQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: ENV_CONFIG.CRYPTO_SERVICE_URL,
  mode: 'cors',
  prepareHeaders: (headers, api) => {
    headers.set('Content-Type', 'application/json');
    headers.set('x-cg-demo-api-key', ENV_CONFIG.CRYPTO_SERVICE_KEY);
    return headers;
  },
});
