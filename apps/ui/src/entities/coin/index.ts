import { coinModel as model } from './model/model';
import { getMarkets, getCategories } from './api/api.endpoints';
import { getMarkets as getMarketsEffect } from './model/effects/get-markets';
import * as selectors from './model/selectors';

// MODEL
const { name, reducer, actions } = model;
export const coinModel = {
  name,
  reducer,
  ...actions,

  api: {
    getMarkets,
    getCategories,
  },

  effects: {
    getMarkets: getMarketsEffect,
  },

  ...selectors,
};

// UI
export { MarketsOverview } from './ui/markets-overview';

export { type ModelState as CoinModelState } from './model/model';
