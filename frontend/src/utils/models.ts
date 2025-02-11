export interface Player {
  id: string;
  name: string;
  role?: string;
  dedupe?: number;
  disconnected: boolean;
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
  playerId: string;
}

interface CheckLobbyRequest {
  playerName: string;
  playerId: string;
}

export type RequestBody = CreateLobbyRequest | CheckLobbyRequest;

export enum LobbyStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
}
