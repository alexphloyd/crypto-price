import { type CoinModelState } from '@app/entities/coin';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetMarketsParams } from '../../api/api.interface';
import { coinApi } from '../../api/api.endpoints';
import { type CoinMarketsOverview } from '../types/core';

export const getMarkets = createAsyncThunk<
  CoinMarketsOverview[] | undefined | void,
  { type: keyof CoinModelState['marketsOverview']; queryArgs: GetMarketsParams },
  {
    rejectValue: ErrorMessage;
  }
>('coin-model/get-markets', async ({ type, queryArgs }, { dispatch, rejectWithValue, fulfillWithValue }) => {
  let data: CoinMarketsOverview[] | undefined;
  let error: unknown;

  if (type === 'base') {
    const { data: queryRes, error: queryError } = await dispatch(
      coinApi.endpoints.getMarkets.initiate(queryArgs, { forceRefetch: true }),
    );
    data = queryRes;
    error = queryError;
  }

  if (error) {
    const msg = typeof error === 'string' ? error : 'Crypto API is getting coffee.. Please, call again later';
    return rejectWithValue(msg);
  }

  return fulfillWithValue(data);
});
