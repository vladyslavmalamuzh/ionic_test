import {ActionReducer, ActionReducerMap, INIT, MetaReducer} from '@ngrx/store';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {environment} from '../../environments/environment';
import { HomeActions } from "./home/home.actions";
import { fromHome } from "./home/home.reducer";

export const routerFeatureKey = 'router';

export interface State {
	[routerFeatureKey]: RouterReducerState;
	[fromHome.homeFeatureKey]: fromHome.IState;
}
export const reducers: ActionReducerMap<State> = {
	[routerFeatureKey]: routerReducer,
	[fromHome.homeFeatureKey]: fromHome.reducer,
}
export function restoreState(reducer: ActionReducer<State>): ActionReducer<State> {
	return (state, action) => {
		const currentActionType = action.type;
		const actionsNeedRestoreState = [
			HomeActions.clearAllState,
		];
		
		if (actionsNeedRestoreState.find(item => item.type === currentActionType)) {
			return reducer(undefined, {type: INIT});
		}
		return reducer(state, action);
	};
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [restoreState] : [restoreState];
