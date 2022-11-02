import { Action } from './action';
import { Player, Host } from '../models';
import { Socket } from 'socket.io';

export enum PlayerActionTypes {
  updatePlayerName = 'UPDATE_PLAYER_NAME',
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

export class UpdatePlayerName implements Action<{ id: string; name: string }> {
  readonly type = PlayerActionTypes.updatePlayerName;

  constructor(readonly payload: { id: string; name: string }) {}
}

export class RemovePlayer implements Action<string> {
  readonly type = PlayerActionTypes.removePlayer;
  constructor(readonly payload: string) {}
}

export class ClearPlayers implements Action {
  readonly type = PlayerActionTypes.clearPlayers;
}

export class PlayerConnected implements Action<{ socket: Socket; id: string }> {
  readonly type = PlayerActionTypes.playerConnected;
  constructor(readonly payload: { socket: Socket; id: string }) {}
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
  | UpdatePlayerName
  | RemovePlayer
  | ClearPlayers
  | PlayerConnected
  | AddHost
  | RemoveHost
  | DebugKillGame
  | OpenGame;
