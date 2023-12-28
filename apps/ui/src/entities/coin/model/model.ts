import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getMarkets } from './effects/get-markets';
import { getCategories } from './effects/get-categories';
import { type MarketsInstance, type ModelState } from './types/model-state';
import { type MarketsFilter } from './types/markets-filter';

const initialState = {
  categories: {
    data: [],
    getCategoriesEffect: {
      status: 'idle',
      error: undefined,
    },
  },
  markets: {},
} as ModelState;

export const coinModel = createSlice({
  initialState,
  name: 'coin-model',
  reducers: {
    createMarketsInstance(state, action: PayloadAction<InstanceKey>) {
      const instanceKey = action.payload;
      state.markets[instanceKey] = {
        data: [],
        filters: {
          order: 'market_cap_desc',
          category: null,
        },
        getMarketsEffect: {
          status: 'idle',
          error: undefined,
        },
      } as MarketsInstance;
    },

    setMarketFilter<K extends keyof MarketsFilter>(
      state: typeof initialState,
      action: PayloadAction<{
        uniqueKey: string;
        key: K;
        value: MarketsFilter[K];
      }>,
    ) {
      const { uniqueKey, key, value } = action.payload;
      const instance = state.markets[uniqueKey];

      if (instance) {
        state.markets[uniqueKey].filters = {
          ...instance.filters,
          [key]: value,
        };
      }
    },
  },
  extraReducers: (builder) => {
    // get-markets
    builder.addCase(getMarkets.pending, (state, { meta }) => {
      state.markets[meta.arg.instanceKey].getMarketsEffect.status = meta.requestStatus;
    });

    builder.addCase(getMarkets.fulfilled, (state, { meta, payload }) => {
      state.markets[meta.arg.instanceKey].getMarketsEffect.status = meta.requestStatus;
      state.markets[meta.arg.instanceKey].data = payload;
    });

    builder.addCase(getMarkets.rejected, (state, { meta, payload }) => {
      state.markets[meta.arg.instanceKey].getMarketsEffect.status = meta.requestStatus;
      state.markets[meta.arg.instanceKey].getMarketsEffect.error = payload;
    });

    // get-categories
    builder.addCase(getCategories.pending, (state, { meta }) => {
      state.categories.getCategoriesEffect.status = meta.requestStatus;
    });

    builder.addCase(getCategories.fulfilled, (state, { meta, payload }) => {
      state.categories.data = payload;
      state.categories.getCategoriesEffect.status = meta.requestStatus;
    });

    builder.addCase(getCategories.rejected, (state, { meta }) => {
      state.categories.getCategoriesEffect.status = meta.requestStatus;
    });
  },
});
