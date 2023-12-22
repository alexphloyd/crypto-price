import { type RefreshResponse } from '@api-types/domain/auth/types';
import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenService } from '@app/shared/services';
import { ENV_CONFIG } from '@app/shared/config';

const REFRESH_TOKENS_API_PATH = 'auth/refresh';

export const queryWithAuthTokens: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: ENV_CONFIG.AUTH_SERVICE_URL,
  mode: 'cors',
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const access = tokenService.getAccessToken();

    headers.set('Content-Type', 'application/json');
    if (access) {
      headers.set('Authorization', `Bearer ${access}`);
    }

    return headers;
  },
});

export const coreQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let incomingQueryRes = await queryWithAuthTokens(args, api, extraOptions);

  if (incomingQueryRes.error && incomingQueryRes.error.status === 401) {
    const refresh = await queryWithAuthTokens(REFRESH_TOKENS_API_PATH, api, extraOptions);
    const tokens = refresh.data as Awaited<RefreshResponse>;

    if (tokens) {
      tokenService.setAuthTokens(tokens);
      incomingQueryRes = await queryWithAuthTokens(args, api, extraOptions);
    }
  }

  return incomingQueryRes;
};
