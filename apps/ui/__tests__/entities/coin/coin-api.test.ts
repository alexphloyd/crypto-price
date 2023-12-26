import { coinModel } from '@app/entities/coin';
import { describe, it } from 'vitest';
import { makeStore } from '@app/app/store/app-store';

describe('coin-api', async () => {
  const store = makeStore();

  const PER_PAGE = 4;
  let specificCoinId: string;

  it('get-markets', async () => {
    const { data: markets } = await store.dispatch(
      coinModel.api.getMarkets.initiate({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        page: '1',
        per_page: String(PER_PAGE),
        locale: 'en',
        sparkline: 'false',
        precision: 'full',
      }),
    );
    expect(markets).toBeDefined();
    expect(markets?.length).toBe(PER_PAGE);

    if (markets?.length) {
      specificCoinId = markets[0].id;
    }
  });

  it('get-specific-markets', async () => {
    const { data: markets } = await store.dispatch(
      coinModel.api.getMarkets.initiate({
        ids: specificCoinId,
        vs_currency: 'usd',
        order: 'market_cap_desc',
        page: '1',
        per_page: '20',
        locale: 'en',
        sparkline: 'false',
        precision: 'full',
      }),
    );
    const coin = markets?.[0];
    expect(coin).toBeDefined();

    if (coin) {
      expect(markets[0].id).toStrictEqual(specificCoinId);
    }
  });
});
