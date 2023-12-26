import { createSlice } from '@reduxjs/toolkit';
import { CoinMarketsOverview } from './types/core';
import { getMarkets } from './effects/get-markets';

export interface ModelState {
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
  };
}

const initialState: ModelState = {
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
      state.marketsOverview.data[meta.arg.mode] = payload ?? [];
    });

    builder.addCase(getMarkets.rejected, (state, { meta, payload }) => {
      state.effects.getMarkets[meta.arg.mode].status = meta.requestStatus;
      state.effects.getMarkets[meta.arg.mode].error = payload;
    });
  },
});
