import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { authApi } from '@app/shared/api';

export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export const appStore = makeStore();
