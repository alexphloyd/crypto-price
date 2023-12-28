import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getMarkets } from './effects/get-markets';
import { getCategories } from './effects/get-categories';
import { type ModelState } from './types/model-state';
import { MarketsFilter } from './types/markets-filter';

const initialState: ModelState = {
  categories: [],

  marketsOverview: {
    data: {
      global: [],
      personal: [],
    },
    filters: {
      global: { order: 'market_cap_desc', category: null },
      personal: { order: 'market_cap_desc', category: null },
    },
  },

  effects: {
    getMarkets: {
      global: {
        status: 'idle',
        error: undefined,
      },
      personal: {
        status: 'idle',
        error: undefined,
      },
    },

    getCategories: {
      status: 'idle',
      error: undefined,
    },
  },
};

export const coinModel = createSlice({
  initialState,
  name: 'coin-model',
  reducers: {
    setMarketFilter<K extends keyof MarketsFilter>(
      state: typeof initialState,
      action: {
        payload: {
          mode: keyof ModelState['marketsOverview']['filters'];
          key: K;
          value: MarketsFilter[K];
        };
      },
    ) {
      const { mode, key, value } = action.payload;
      const current = state.marketsOverview.filters[mode];
      state.marketsOverview.filters[mode] = {
        ...current,
        [key]: value,
      };
    },
  },
  extraReducers: (builder) => {
    // get-markets
    builder.addCase(getMarkets.pending, (state, { meta }) => {
      state.effects.getMarkets[meta.arg.mode].status = meta.requestStatus;
    });

    builder.addCase(getMarkets.fulfilled, (state, { meta, payload }) => {
      state.effects.getMarkets[meta.arg.mode].status = meta.requestStatus;
      state.marketsOverview.data[meta.arg.mode] = payload;
    });

    builder.addCase(getMarkets.rejected, (state, { meta, payload }) => {
      state.effects.getMarkets[meta.arg.mode].status = meta.requestStatus;
      state.effects.getMarkets[meta.arg.mode].error = payload;
    });

    // get-categories
    builder.addCase(getCategories.pending, (state, { meta }) => {
      state.effects.getCategories.status = meta.requestStatus;
    });

    builder.addCase(getCategories.fulfilled, (state, { meta, payload }) => {
      state.categories = payload;
      state.effects.getCategories.status = meta.requestStatus;
    });

    builder.addCase(getCategories.rejected, (state, { meta }) => {
      state.effects.getCategories.status = meta.requestStatus;
    });
  },
});
