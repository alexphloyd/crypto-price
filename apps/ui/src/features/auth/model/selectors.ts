import { AppState } from '@app/app/store/types';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const useSignInProcessStep = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.signInProcess,
      (process) => process.step,
    ),
  );

export const useSignInTab = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.signInProcess,
      (process) => process.tab,
    ),
  );
