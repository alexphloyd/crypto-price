import { createAsyncThunk } from '@reduxjs/toolkit';
import { coinApi } from '../../api/api.endpoints';
import { CRYPTO_API_ERROR_MESSAGE } from '@app/shared/api/config/crypto-api-error-message';

export const getCategories = createAsyncThunk(
  'coin-model/get-categories',
  async (_args, { dispatch, rejectWithValue, fulfillWithValue }) => {
    const { data: categories, error } = await dispatch(
      coinApi.endpoints.getCategories.initiate(undefined, { forceRefetch: true }),
    );

    if (error) {
      const msg = typeof error === 'string' ? error : CRYPTO_API_ERROR_MESSAGE;
      return rejectWithValue(msg);
    }

    return fulfillWithValue(categories ?? []);
  },
);
