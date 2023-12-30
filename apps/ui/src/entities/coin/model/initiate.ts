import { coinModel } from './model';
import { MARKETS_INSTANCES } from './config/markets.instances';
import { type AppDispatch } from '@app/app/store/types';

export function initiate(dispatch: AppDispatch) {
  initiateMarketsInstances(dispatch);
}

function initiateMarketsInstances(dispatch: AppDispatch) {
  for (const key of Object.keys(MARKETS_INSTANCES)) {
    dispatch(coinModel.actions.createMarketsInstance(key));
  }
}
