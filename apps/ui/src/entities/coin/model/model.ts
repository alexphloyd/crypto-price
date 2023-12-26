import { createSlice } from '@reduxjs/toolkit';
import { CoinMarketsOverview } from './types/core';
import { getMarkets } from './effects/get-markets';

export interface ModelState {
  marketsOverview: {
    base: CoinMarketsOverview[];
    personal: CoinMarketsOverview[];
  };

  effects: {
    getMarkets: {
      base: {
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
    base: [],
    personal: [],
  },

  effects: {
    getMarkets: {
      base: {
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
    // GET-MARKETS
    builder.addCase(getMarkets.pending, (state, { meta }) => {
      state.effects.getMarkets[meta.arg.type].status = meta.requestStatus;
    });

    builder.addCase(getMarkets.fulfilled, (state, { meta, payload }) => {
      state.effects.getMarkets[meta.arg.type].status = meta.requestStatus;
      state.marketsOverview[meta.arg.type] = payload ?? [];
    });

    builder.addCase(getMarkets.rejected, (state, { meta, payload }) => {
      state.effects.getMarkets[meta.arg.type].status = meta.requestStatus;
      state.effects.getMarkets[meta.arg.type].error = payload;
    });
  },
});
