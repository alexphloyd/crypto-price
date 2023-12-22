import { type AppState } from '@app/app/store/types';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const useAuthProcessStep = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.signInProcess,
      (process) => process.step,
    ),
  );

export const useAuthProcessTab = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.signInProcess,
      (process) => process.tab,
    ),
  );

export const useSignInProcessCredentials = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.signInProcess,
      (process) => process.credentials,
    ),
  );

export const useLoginErrorMessage = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth.loginProcess,
      (process) => process.error,
    ),
  );

export const useSession = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth,
      (auth) => auth.session,
    ),
  );

export const useIsSessionChecking = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth,
      (auth) => auth.isSessionChecking,
    ),
  );

export const useIsLoginPending = () =>
  useSelector(
    createSelector(
      (state: AppState) => state.auth,
      (auth) => auth.isLoginPending,
    ),
  );
