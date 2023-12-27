import { describe, it } from 'vitest';
import { makeStore } from '@app/app/store/app-store';
import { coinModel } from '@app/entities/coin';

const EMPTY = 0;

describe('coin-model', async () => {
  const store = makeStore();
  const { dispatch, getState } = store;

  it('manage 2 diff lists in model', async () => {
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

  it('receive categories', async () => {
    const { payload: categories } = await dispatch(coinModel.effects.getCategories());

    const dataInModel = getState()['coin-model'].categories;

    expect(categories).toBeInstanceOf(Array);
    expect(dataInModel).toBeInstanceOf(Array);
  });
});
