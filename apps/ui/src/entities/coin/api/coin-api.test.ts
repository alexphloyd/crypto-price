import { coinApi } from './coin-api';
import { describe, it } from 'vitest';
import { appStore } from '@app/app/store/app-store';
describe('coin-api', async () => {
  it('get-markets', async () => {
    appStore.dispatch(
      coinApi.endpoints.getMarkets.initiate({
        vs_currency: 'usd',
        order: 'market_cap_desc',
        page: '1',
        per_page: '50',
        locale: 'en',
      }),
    );
    const queries = await Promise.all(appStore.dispatch(coinApi.util.getRunningQueriesThunk()));
    console.log(queries[0].error.data);
  });
});
