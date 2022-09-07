import { createAction, props } from '@ngrx/store';

export namespace HomeActions {
	
	export const doSomething = createAction(
		'[Home] Do something',
		props<{ randomProp: string }>(),
	);
	
	export const clearAllState = createAction(
		'[Home] Clear All state',
	);
}
