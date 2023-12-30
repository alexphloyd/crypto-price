import { type GetMarketsParams } from '../../api/api.interface';
import { type MarketOverview } from '../types/markets/core';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { coinApi } from '../../api/api.endpoints';
import { CRYPTO_API_ERROR_MESSAGE } from '@app/shared/api/config/crypto-api-error-message';

export const getMarkets = createAsyncThunk<
  MarketOverview[],
  { instanceKey: InstanceKey; queryArgs: GetMarketsParams },
  { rejectValue: ErrorMessage }
>(
  'coin-model/get-markets',
  async ({ queryArgs }, { dispatch, rejectWithValue, fulfillWithValue }) => {
    console.log('call effect');

    const { data: markets, error } = await dispatch(
      coinApi.endpoints.getMarkets.initiate(queryArgs, { forceRefetch: true }),
    );

    if (error) {
      const msg = typeof error === 'string' ? error : CRYPTO_API_ERROR_MESSAGE;
      return rejectWithValue(msg);
    }

    return fulfillWithValue(markets ?? []);
  },
);
