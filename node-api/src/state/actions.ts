import { Action } from './action';
import { Player, Host } from '../models';

export enum PlayerActionTypes {
  addPlayer = 'ADD_PLAYER',
}

export enum HostActionTypes {
  addHost = 'ADD_HOST',
  debugKillGame = 'DEBUG_KILL_GAME',
  debugOpenGame = 'DEBUG_OPEN_GAME',
}

export class AddPlayer implements Action<Player> {
  readonly type = PlayerActionTypes.addPlayer;

  constructor(readonly payload: Player) {}
}

export class AddHost implements Action<Host> {
  readonly type = HostActionTypes.addHost;
  constructor(readonly payload: Host) {}
}

export class DebugKillGame implements Action {
  readonly type = HostActionTypes.debugKillGame;
}

export class DebugOpenGame implements Action {
  readonly type = HostActionTypes.debugOpenGame;
}

export type actions = AddPlayer | AddHost | DebugKillGame | DebugOpenGame;
