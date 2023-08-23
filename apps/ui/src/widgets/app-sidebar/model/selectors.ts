import { AppState } from '@app/app/store/types';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const useShowSidebar = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.sidebar,
      (model) => model.show
    )
  );
