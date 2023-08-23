import { type ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { appStore } from '../store';

export const withStore = (component: () => ReactNode) => () => {
  return <ReduxProvider store={appStore}>{component()}</ReduxProvider>;
};
