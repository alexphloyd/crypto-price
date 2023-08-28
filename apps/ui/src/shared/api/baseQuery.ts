import { type RefreshRes } from '@api-types';
import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { tokenService } from '@app/shared/services';
import { REFRESH_API_PATH } from '@app/shared/api/config';
import { ENV_CONFIG } from '@app/shared/config';

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> =
  fetchBaseQuery({
    baseUrl: ENV_CONFIG.API_URL,
    mode: 'cors',
    prepareHeaders: (headers, api) => {
      const access = Cookies.get('access');

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
    const refreshReq = await baseQuery(REFRESH_API_PATH, api, extraOptions);
    if (refreshReq.data) {
      tokenService.set(refreshReq.data as Awaited<RefreshRes>);
      incomingQueryRes = await baseQuery(args, api, extraOptions);
    }
  }

  return incomingQueryRes;
};