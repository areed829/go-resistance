import { distinctUntilChanged, filter, map, shareReplay, take } from 'rxjs';
import { Player } from '../models';
import { getGameState } from './state';

export const getPlayers = () =>
  getGameState().pipe(
    map((state) => state.players),
    distinctUntilChanged()
  );

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

export const getGameCanStart = () =>
  getGameState().pipe(
    filter(
      (state) =>
        !!state.host && fiveOrMoreValidPlayers(Object.values(state.players))
    ),
    take(1),
    shareReplay()
  );

const fiveOrMoreValidPlayers = (players: Player[]) =>
  players.filter((player) => player.name).length >= 5;
