import { describe, it } from 'vitest';
import { createStore } from '@app/app/store/app-store';
import { coinModel } from '@app/entities/coin';
import { nanoid } from '@reduxjs/toolkit';

describe('coin-model', async () => {
  const store = createStore().store;
  const { dispatch, getState } = store;

  it('manage 2 instance in model', async () => {
    const instanceKeyA = nanoid();
    const instanceKeyB = nanoid();

    dispatch(coinModel.actions.createMarketsInstance(instanceKeyA));
    dispatch(coinModel.actions.createMarketsInstance(instanceKeyB));

    await dispatch(
      coinModel.effects.getMarkets({
        instanceKey: instanceKeyA,
        queryArgs: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          page: '1',
          per_page: '1',
          locale: 'en',
          sparkline: 'false',
          precision: 'full',
        },
      }),
    );

    await dispatch(
      coinModel.effects.getMarkets({
        instanceKey: instanceKeyB,
        queryArgs: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          page: '1',
          per_page: '2',
          locale: 'en',
          sparkline: 'false',
          precision: 'full',
        },
      }),
    );

    expect(Object.keys(getState()['coin-model'].markets).length).toBe(2);
    expect(getState()['coin-model'].markets[instanceKeyA].data.length).toBe(1);
    expect(getState()['coin-model'].markets[instanceKeyB].data.length).toBe(2);
  });

  it('receive categories', async () => {
    const { payload: categories } = await dispatch(coinModel.effects.getCategories());

    const dataInModel = getState()['coin-model'].categories.data;

    expect(categories).toBeInstanceOf(Array);
    expect(dataInModel).toBeInstanceOf(Array);
  });
});
