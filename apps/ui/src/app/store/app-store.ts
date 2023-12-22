import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { coreApi } from '@app/shared/api';
import { cryptoApi } from '@app/shared/api/instances/crypto-api';

export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coreApi.middleware).concat(cryptoApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export const appStore = makeStore();
