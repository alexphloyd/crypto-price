import { type AppState } from '@app/app/store/types';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ModelState } from './model';

export const useMarketsOverview = <S extends keyof ModelState['marketsOverview']>({
  subject,
  mode,
}: {
  subject: S;
  mode: keyof ModelState['marketsOverview'][S];
}) =>
  useSelector(
    createSelector(
      (state: AppState) => state['coin-model'].marketsOverview[subject],
      (subject) => subject[mode],
    ),
  );

export const useEffectState = <E extends keyof ModelState['effects']>({
  effect,
  mode,
}: {
  effect: E;
  mode: keyof ModelState['effects'][E];
}) =>
  useSelector(
    createSelector(
      (state: AppState) => state['coin-model'].effects[effect],
      (effect) => effect[mode],
    ),
  );
