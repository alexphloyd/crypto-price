import { coinModel } from './model';
import { appStore } from '@app/app/store/app-store';
import { MARKETS_INSTANCES } from './config/markets.instances';

function initiateInstances() {
  const { dispatch } = appStore;

  for (const key of Object.keys(MARKETS_INSTANCES)) {
    dispatch(coinModel.actions.createMarketsInstance(key));
  }
}

initiateInstances();
