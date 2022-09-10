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
	export const selectCardById = createSelector(
		selectHomeState,
		(state: fromHome.IState, id: number) => state.cards.find((e) => e.sku === id)
	);
}
