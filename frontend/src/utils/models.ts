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
  startTime?: number;
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
  CREATED = 'CREATED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
