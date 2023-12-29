import { coinModel as model } from './model/model';
import { getMarkets, getCategories } from './api/api.endpoints';
import { getMarkets as getMarketsEffect } from './model/effects/get-markets';
import { getCategories as getCategoriesEffect } from './model/effects/get-categories';
import * as selectors from './model/selectors';

// MODEL
const { name, reducer, actions } = model;
export const coinModel = {
  name,
  reducer,

  actions,

  api: {
    getMarkets,
    getCategories,
  },

  effects: {
    getMarkets: getMarketsEffect,
    getCategories: getCategoriesEffect,
  },

  ...selectors,
};

// UI
export { MarketsOverview } from './ui/markets-overview';

// TYPES
export { type ModelState as CoinModelState } from './model/types/core';

// CONFIG
export { MARKETS_INSTANCES } from './model/config/markets.instances';
