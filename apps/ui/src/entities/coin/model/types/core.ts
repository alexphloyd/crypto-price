export type MarketOverview = {
  id: string;
  symbol: string;
  name: string;
  image: ImageSrcUrl;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: DateTimeString;
};

export type MarketCategory = {
  id: CategoryId;
  name: CategoryName;

  market_cap: number;
  market_cap_change_24h: number;

  content: string;
  top_3_coins: Array<ImageSrcUrl>;

  volume_24h: number;
  updated_at: DateTimeString;
};
