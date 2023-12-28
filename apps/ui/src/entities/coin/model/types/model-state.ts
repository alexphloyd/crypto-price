import { type MarketCategory, type MarketOverview } from './core';
import { type MarketsFilter } from './markets-filter';

export interface ModelState {
  markets: Record<InstanceKey, MarketsInstance>;

  categories: {
    data: MarketCategory[];
    getCategoriesEffect: EffectState;
  };
}

export type MarketsInstance = {
  filters: MarketsFilter;
  data: MarketOverview[];
  getMarketsEffect: EffectState;
};
