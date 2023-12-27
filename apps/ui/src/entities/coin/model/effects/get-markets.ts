import { type CoinModelState } from '@app/entities/coin';
import { type GetMarketsParams } from '../../api/api.interface';
import { type CoinMarketsOverview } from '../types/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { coinApi } from '../../api/api.endpoints';
import { CRYPTO_API_ERROR_MESSAGE } from '@app/shared/api/config/crypto-api-error-message';

export const getMarkets = createAsyncThunk<
  CoinMarketsOverview[],
  { mode: keyof CoinModelState['marketsOverview']['data']; queryArgs: GetMarketsParams },
  { rejectValue: ErrorMessage }
>('coin-model/get-markets', async ({ mode, queryArgs }, { dispatch, rejectWithValue, fulfillWithValue }) => {
  const { data: markets, error } = await dispatch(
    coinApi.endpoints.getMarkets.initiate(queryArgs, { forceRefetch: true }),
  );

  if (error) {
    const msg = typeof error === 'string' ? error : CRYPTO_API_ERROR_MESSAGE;
    return rejectWithValue(msg);
  }

  return fulfillWithValue(markets ?? []);
});
