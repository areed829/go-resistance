import { BehaviorSubject } from 'rxjs';
import { GameStatus, Host, Player } from '../models';
import { actions, PlayerActionTypes, HostActionTypes } from './actions';

export interface GameState {
  players: { [id: string]: Player };
  host: Host;
  gameStatus: GameStatus;
}

export const defaultState: GameState = {
  players: {},
  host: { socket: null },
  gameStatus: GameStatus.Closed,
};

const state$: BehaviorSubject<GameState> = new BehaviorSubject(defaultState);

export const gameStateReducer = (action: actions) => {
  let state = state$.getValue();
  switch (action.type) {
    case PlayerActionTypes.updatePlayerName: {
      const { id, name } = action.payload;
      state = {
        ...state,
        players: {
          ...state.players,
          [id]: {
            ...state.players[id],
            id,
            name,
            isFirst: !Object.values(state.players).some(
              ({ isFirst }) => isFirst
            ),
          },
        },
      };
      break;
    }
    case PlayerActionTypes.removePlayer: {
      const { [action.payload]: removedPlayer, ...filteredPlayers } =
        state.players;
      state = {
        ...state,
        players: filteredPlayers,
      };
      break;
    }
    case PlayerActionTypes.clearPlayers: {
      state = {
        ...state,
        players: {},
      };
      break;
    }
    case PlayerActionTypes.playerConnected: {
      const { socket, id } = action.payload;
      const player = state.players[id];
      if (!player) {
        state = {
          ...state,
          players: {
            ...state.players,
            [id]: {
              id,
              isFirst: false,
              name: '',
              socket,
            },
          },
        };
      }
      break;
    }
    case HostActionTypes.addHost:
      state = {
        ...state,
        host: action.payload,
        gameStatus: GameStatus.Open,
      };
      break;
    case HostActionTypes.removeHost:
      state = {
        ...state,
        host: { socket: null },
      };
      break;
    case HostActionTypes.debugKillGame:
      state = {
        ...state,
        gameStatus: GameStatus.Closed,
      };
      break;
    case HostActionTypes.openGame:
      state = {
        ...state,
        gameStatus: GameStatus.Open,
      };
  }

  state$.next(state);
};

export const getGameState = () => state$.asObservable();
