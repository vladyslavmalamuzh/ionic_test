import { Store } from "@ngrx/store";
import { Injectable } from "@angular/core";
import { Actions } from "@ngrx/effects";

@Injectable()
export class HomeEffects {
	

	
	constructor(private actions$: Actions,
	            private store$: Store) {
	}
}
