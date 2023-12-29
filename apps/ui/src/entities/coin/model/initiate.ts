import { appStore } from '@app/app/store/app-store';
import { coinModel } from './model';

export const MARKETS_INSTANCES = {
  GLOBAL: 'GLOBAL',
  PERSONAL: 'PERSONAL',
} as const;

export type MarketInstancesKey = keyof typeof MARKETS_INSTANCES;

function initiateInstances() {
  const { dispatch } = appStore;

  for (const key of Object.keys(MARKETS_INSTANCES)) {
    dispatch(coinModel.actions.createMarketsInstance(key));
  }
}

initiateInstances();
