import { createReducer, on } from '@ngrx/store';
import { HomeActions } from './home.actions';
import { ICardModel } from '../../services/http/models/cards.model';

export namespace fromHome {
  export const homeFeatureKey = 'home';

  export interface IState {
    something: any;
    cards: ICardModel[];
  }

  export const initialState: IState = {
    something: '',
    cards: [],
  };

  export const reducer = createReducer(
    initialState,

    on(HomeActions.doSomething, (state, { randomProp }) => ({
      ...state,
      something: randomProp,
    })),
    on(HomeActions.loadCardsSuccess, (state, { response }) => ({
      ...state,
      cards: response,
    }))
  );
}
