import { authModel } from '@app/features/auth';
import { sidebarModel } from '@app/widgets/app-sidebar';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  [sidebarModel.name]: sidebarModel.reducer,
  [authModel.name]: authModel.reducer,
});
