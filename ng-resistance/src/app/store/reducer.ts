import { createReducer, on, State, Action } from '@ngrx/store';
import { Player } from '../models';

export interface AppState {
  players: Player[];
}

export const initialState: AppState = {
  players: [],
};

export const gameReducer = createReducer(
  initialState,
  // on(featureActions.action, (state) => ({ ...state, prop: updatedValue })),
);
