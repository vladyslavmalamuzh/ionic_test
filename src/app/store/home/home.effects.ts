import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeActions } from './home.actions';
import { CardsHttpService } from '../../services/http/cards.http';

@Injectable()
export class HomeEffects {
  public loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadCards),
      switchMap(() =>
        this.cardsHttp.getCards().pipe(
          map((response) => HomeActions.loadCardsSuccess({ response })),
          catchError((error) => of(HomeActions.loadCardsFailure({ error })))
        )
      )
    )
  );

  public loadCardsFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomeActions.loadCardsFailure),
        tap((e) => {
						console.log(e)
            alert('we also can add alert service for alert handling');
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private store$: Store,
    private cardsHttp: CardsHttpService
  ) {}
}
