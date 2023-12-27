import { type CoinModelState } from '@app/entities/coin';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type GetMarketsParams } from '../../api/api.interface';
import { coinApi } from '../../api/api.endpoints';
import { type CoinMarketsOverview } from '../types/core';

export const getMarkets = createAsyncThunk<
  CoinMarketsOverview[] | undefined,
  { mode: keyof CoinModelState['marketsOverview']['data']; queryArgs: GetMarketsParams },
  { rejectValue: ErrorMessage }
>('coin-model/get-markets', async ({ mode, queryArgs }, { dispatch, rejectWithValue, fulfillWithValue }) => {
  const { data, error } = await dispatch(
    coinApi.endpoints.getMarkets.initiate(queryArgs, { forceRefetch: true }),
  );

  if (error) {
    const msg = typeof error === 'string' ? error : 'Crypto API is getting coffee.. Please, call again later';
    return rejectWithValue(msg);
  }
  return fulfillWithValue(data);
});
