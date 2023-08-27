import { authModel } from '@app/features/auth';
import { baseApi } from '@app/shared/api';
import { sidebarModel } from '@app/widgets/app-sidebar';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,

  [sidebarModel.name]: sidebarModel.reducer,
  [authModel.name]: authModel.reducer,
});
