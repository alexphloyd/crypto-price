import { authModel } from '@app/features/auth';
import { authApi } from '@app/shared/api';
import { sidebarModel } from '@app/widgets/app-sidebar';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,

  [sidebarModel.name]: sidebarModel.reducer,
  [authModel.name]: authModel.reducer,
});
