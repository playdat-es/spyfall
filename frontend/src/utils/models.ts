export interface Player {
  id: string;
  name: string;
  dedupe?: number;
  role?: string;
}

export interface Lobby {
  id: string;
  creator: string;
  players: Player[];
  location?: string;
  start_time?: number;
  duration?: number;
}

interface CreateLobbyRequest {
  playerName: string;
}

interface CheckLobbyRequest {
  playerName: string;
}

export type RequestBody = CreateLobbyRequest | CheckLobbyRequest;

export enum LobbyStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
}
