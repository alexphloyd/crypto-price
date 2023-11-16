import { type ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { appStore } from '../store/app-store';

export const withStore = (component: () => ReactNode) => () => {
  return <StoreProvider store={appStore}>{component()}</StoreProvider>;
};
