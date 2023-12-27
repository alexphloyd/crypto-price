import { type CoinCategory, type CoinMarketsOverview } from './types/core';
import { createSlice } from '@reduxjs/toolkit';
import { getMarkets } from './effects/get-markets';
import { getCategories } from './effects/get-categories';

export interface ModelState {
  categories: CoinCategory[];

  marketsOverview: {
    data: {
      global: CoinMarketsOverview[];
      personal: CoinMarketsOverview[];
    };
    filters: {
      global: unknown; // no filters yet
      personal: unknown;
    };
  };

  effects: {
    getMarkets: {
      global: {
        status: EffectStatus;
        error: ErrorMessage;
      };
      personal: {
        status: EffectStatus;
        error: ErrorMessage;
      };
    };

    getCategories: {
      status: EffectStatus;
      error: ErrorMessage;
    };
  };
}

const initialState: ModelState = {
  categories: [],

  marketsOverview: {
    data: {
      global: [],
      personal: [],
    },
    filters: {
      global: [],
      personal: [],
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
  reducers: {},
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
