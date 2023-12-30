import { type AppState } from '@app/app/store/types';
import { type ModelState } from './types/core';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const useMarketsOverview = <S extends keyof ModelState['markets'][string]>({
  instanceKey,
  subject,
}: {
  instanceKey: string;
  subject: S;
}) => {
  return useSelector(
    createSelector(
      (state: AppState) => state['coin-model'].markets?.[instanceKey],
      (instance) => instance?.[subject],
    ),
  );
};

export const useCategories = <S extends keyof ModelState['categories']>({
  subject,
}: {
  subject: S;
}) => {
  return useSelector(
    createSelector(
      (state: AppState) => state['coin-model'].categories,
      (categories) => categories?.[subject],
    ),
  );
};
