import { BehaviorSubject, map } from 'rxjs';
import { GameStatus, Host, Player } from '../models';
import { actions, PlayerActionTypes, HostActionTypes } from './actions';

export interface GameState {
  players: Player[];
  host: Host;
  gameStatus: GameStatus;
}

export const defaultState: GameState = {
  players: [],
  host: { socket: null },
  gameStatus: GameStatus.Closed,
};

const state$: BehaviorSubject<GameState> = new BehaviorSubject(defaultState);

export const gameStateReducer = (action: actions) => {
  let state = state$.getValue();
  switch (action.type) {
    case PlayerActionTypes.addPlayer:
      state = {
        ...state,
        players: [...state.players, action.payload as Player],
      };
      break;
    case HostActionTypes.addHost:
      state = {
        ...state,
        host: action.payload as Host,
      };
      break;
    case HostActionTypes.debugKillGame:
      state = {
        ...state,
        gameStatus: GameStatus.Closed,
      };
      break;
    case HostActionTypes.debugOpenGame:
      state = {
        ...state,
        gameStatus: GameStatus.Open,
      };
  }

  state$.next(state);
};

export const getGameState = () => state$.asObservable();

export const getPlayersTest = () =>
  getGameState().pipe(map((state) => state.players));
