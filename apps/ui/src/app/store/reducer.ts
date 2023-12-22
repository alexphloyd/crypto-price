import { authModel } from '@app/features/auth';
import { coreApi } from '@app/shared/api';
import { sidebarModel } from '@app/widgets/app-sidebar';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  [coreApi.reducerPath]: coreApi.reducer,

  [sidebarModel.name]: sidebarModel.reducer,
  [authModel.name]: authModel.reducer,
});
