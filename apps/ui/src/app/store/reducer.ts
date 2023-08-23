import { sidebarModel } from '@app/widgets/app-sidebar';
import { combineReducers } from '@reduxjs/toolkit';

export const reducer = combineReducers({
  sidebar: sidebarModel.reducer,
});
