import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { coreApi } from '@app/shared/api';
import { cryptoApi } from '@app/shared/api/instances/crypto-api';
import { coinModel } from '@app/entities/coin';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';

export const createStore = () => {
  const _store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coreApi.middleware).concat(cryptoApi.middleware),
  });

  setupListeners(_store.dispatch);

  const result = {
    store: _store,
    and: function (callback: (dispatch: typeof _store.dispatch) => void) {
      callback(_store.dispatch);
      return result;
    },
  };

  return result;
};

export const appStore = createStore().and(coinModel.initiate).store;
