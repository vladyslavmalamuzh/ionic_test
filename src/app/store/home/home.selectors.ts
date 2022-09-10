import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fromHome } from './home.reducer';

export const selectHomeState = createFeatureSelector<fromHome.IState>(
  fromHome.homeFeatureKey
);
export namespace HomeSelectors {
  export const selectCards = createSelector(
    selectHomeState,
    (state: fromHome.IState) => state.cards
  );
}
