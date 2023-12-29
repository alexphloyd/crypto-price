import { type MarketCategory, type MarketsInstance } from './markets/core';

export interface ModelState {
  markets: Record<InstanceKey, MarketsInstance>;

  categories: {
    data: MarketCategory[];
    getCategoriesEffect: EffectState;
  };
}
