import { type AppState } from '@app/app/store/types';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ModelState } from './model';

export const useMarketsOverview = (type: keyof ModelState['marketsOverview']) =>
  useSelector(
    createSelector(
      (state: AppState) => state['coin-model'].marketsOverview,
      (markets) => markets[type],
    ),
  );

export const useEffectState = (name: keyof ModelState['effects']) =>
  useSelector(
    createSelector(
      (state: AppState) => state['coin-model'].effects,
      (effects) => effects[name],
    ),
  );
