import { type MarketCategory } from './core';

export type MarketsFilter = {
  category: MarketCategory | null;
  order: 'market_cap_asc' | 'market_cap_desc' | 'volume_asc' | 'volume_desc' | 'id_asc' | 'id_desc';
};
