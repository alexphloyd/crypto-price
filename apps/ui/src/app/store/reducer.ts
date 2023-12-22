import { authModel } from '@app/features/auth';
import { coreApi } from '@app/shared/api';
import { cryptoApi } from '@app/shared/api/instances/crypto-api';
import { sidebarModel } from '@app/widgets/app-sidebar';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  [coreApi.reducerPath]: coreApi.reducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,

  [sidebarModel.name]: sidebarModel.reducer,
  [authModel.name]: authModel.reducer,
});
