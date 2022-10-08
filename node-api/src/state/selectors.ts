import { map } from 'rxjs';
import { getGameState } from './state';

export const getPlayers = () =>
  getGameState().pipe(map((state) => state.players));

export const getFirstPlayer = () =>
  getPlayers().pipe(
    map((players) => Object.values(players).find((player) => player.isFirst))
  );

export const playerNameExists = (nameToCheck: string) =>
  getPlayers().pipe(
    map((players) =>
      Object.values(players).some(
        ({ name }) =>
          name.localeCompare(nameToCheck, undefined, {
            sensitivity: 'accent',
          }) === 0
      )
    )
  );

export const getGameStatus = () =>
  getGameState().pipe(map((state) => state.gameStatus));

export const getHost = () => getGameState().pipe(map((state) => state.host));
