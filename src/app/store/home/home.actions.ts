import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ICardModel } from '../../services/http/models/cards.model';

export namespace HomeActions {
	export const loadCards = createAction(
		'[Home] Load Cards',
	);
	export const loadCardsSuccess = createAction(
		'[Home] Load Cards Success',
		props<{ response: ICardModel[] }>(),
	);
	export const loadCardsFailure = createAction(
		'[Home] Load Cards Failure',
		props<{ error: HttpErrorResponse }>(),
	);
  export const doSomething = createAction(
    '[Home] Do something',
    props<{ randomProp: string }>()
  );

  export const clearAllState = createAction('[Home] Clear All state');
}
