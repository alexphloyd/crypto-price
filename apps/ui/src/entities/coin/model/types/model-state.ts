import { type MarketCategory, type MarketOverview } from './core';
import { type MarketsFilter } from './markets-filter';

export interface ModelState {
  categories: MarketCategory[];

  marketsOverview: {
    data: {
      global: MarketOverview[];
      personal: MarketOverview[];
    };
    filters: {
      global: MarketsFilter;
      personal: MarketsFilter;
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
