import { createReducer, on } from '@ngrx/store';
import { HomeActions } from './home.actions';
import { ICardModel } from '../../services/http/models/cards.model';

export namespace fromHome {
  export const homeFeatureKey = 'home';

  export interface IState {
    something: any;
    cards: ICardModel[];
    cacheCards: ICardModel[];
  }

  export const initialState: IState = {
    something: '',
    cards: [],
    cacheCards: [],
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
    })),
    on(HomeActions.cacheSearch, (state, { value }) => ({
      ...state,
      cacheCards: [...state.cards.filter((elem) => elem.name.toLowerCase().includes(value))]
    }))
  );
}
