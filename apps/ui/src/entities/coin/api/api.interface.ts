export type GetMarketsParams = {
  ids?: string;
  vs_currency: Currency;
  category?: CategoryId;
  order: 'market_cap_asc' | 'market_cap_desc' | 'volume_asc' | 'volume_desc' | 'id_asc' | 'id_desc';
  per_page: ElementsPerPage;
  page: PageNumber;
  sparkline?: 'true' | 'false';
  precision?: PricePrecision;
  locale: Locale;
};
