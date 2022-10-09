import { Action } from './action';
import { Player, Host } from '../models';
import { Socket } from 'socket.io';

export enum PlayerActionTypes {
  addPlayer = 'ADD_PLAYER',
  removePlayer = 'REMOVE_PLAYER',
  clearPlayers = 'CLEAR_PLAYERS',
  playerConnected = 'PLAYER_CONNECTED',
}

export enum HostActionTypes {
  addHost = 'ADD_HOST',
  removeHost = 'REMOVE_HOST',
  debugKillGame = 'DEBUG_KILL_GAME',
  openGame = 'DEBUG_OPEN_GAME',
}

export class AddPlayer implements Action<Player> {
  readonly type = PlayerActionTypes.addPlayer;

  constructor(readonly payload: Player) {}
}

export class RemovePlayer implements Action<string> {
  readonly type = PlayerActionTypes.removePlayer;
  constructor(readonly payload: string) {}
}

export class ClearPlayers implements Action {
  readonly type = PlayerActionTypes.clearPlayers;
}

export class PlayerConnected implements Action<Socket> {
  readonly type = PlayerActionTypes.playerConnected;
  constructor(readonly payload: Socket) {}
}

export class AddHost implements Action<Host> {
  readonly type = HostActionTypes.addHost;
  constructor(readonly payload: Host) {}
}

export class RemoveHost implements Action {
  readonly type = HostActionTypes.removeHost;
}

export class DebugKillGame implements Action {
  readonly type = HostActionTypes.debugKillGame;
}

export class OpenGame implements Action {
  readonly type = HostActionTypes.openGame;
}

export type actions =
  | AddPlayer
  | RemovePlayer
  | ClearPlayers
  | PlayerConnected
  | AddHost
  | RemoveHost
  | DebugKillGame
  | OpenGame;
