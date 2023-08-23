import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const makeStore = () => {
  const store = configureStore({
    reducer,
  });

  setupListeners(store.dispatch);

  return store;
};

export const appStore = makeStore();
