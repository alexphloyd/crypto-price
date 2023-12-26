import { describe, it } from 'vitest';
import { makeStore } from '@app/app/store/app-store';
import { coinModel } from '@app/entities/coin';

describe('coin-model', async () => {
  const store = makeStore();
  const EMPTY = 0;

  it('manage 2 lists in model', async () => {
    const { dispatch, getState } = store;
    await dispatch(
      coinModel.effects.getMarkets({
        mode: 'global',
        queryArgs: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          page: '1',
          per_page: '5',
          locale: 'en',
          sparkline: 'false',
          precision: 'full',
        },
      }),
    );

    expect(getState()['coin-model'].marketsOverview.data.personal.length).toBe(EMPTY);
    expect(getState()['coin-model'].marketsOverview.data.global.length).toBe(5);

    await dispatch(
      coinModel.effects.getMarkets({
        mode: 'personal',
        queryArgs: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          page: '1',
          per_page: '12',
          locale: 'en',
          sparkline: 'false',
          precision: 'full',
        },
      }),
    );

    expect(getState()['coin-model'].marketsOverview.data.personal.length).toBe(12);
    expect(getState()['coin-model'].marketsOverview.data.global.length).toBe(5);
  });
});
