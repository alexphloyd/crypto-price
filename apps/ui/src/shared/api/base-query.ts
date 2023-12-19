import { type RefreshResponse } from '@api-types/domain/auth/types';
import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenService } from '@app/shared/services';
import { REFRESH_TOKENS_API_PATH } from '@app/shared/api/config';
import { ENV_CONFIG } from '@app/shared/config';

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> =
  fetchBaseQuery({
    baseUrl: ENV_CONFIG.API_URL,
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

export const baseReauthQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let incomingQueryRes = await baseQuery(args, api, extraOptions);

  if (incomingQueryRes.error && incomingQueryRes.error.status === 401) {
    const refresh = await baseQuery(REFRESH_TOKENS_API_PATH, api, extraOptions);
    const tokens = refresh.data as Awaited<RefreshResponse>;

    if (tokens) {
      tokenService.setAuthTokens(tokens);
      incomingQueryRes = await baseQuery(args, api, extraOptions);
    }
  }

  return incomingQueryRes;
};
