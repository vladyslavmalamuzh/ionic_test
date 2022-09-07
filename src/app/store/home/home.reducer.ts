import { createReducer, on } from "@ngrx/store";
import { HomeActions } from "./home.actions";

export namespace fromHome {
	
	export const homeFeatureKey = 'home';
	
	export interface IState {
		something: any;
	}
	
	export const initialState: IState = {
		something: '',
	};
	
	export const reducer = createReducer(
		initialState,
		
		on(HomeActions.doSomething, (state, {randomProp}) => ({
			...state, something: randomProp,
		})),
	)}
