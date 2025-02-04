export interface Player {
  id: string;
  name: string;
  dedupe?: number;
}

interface CreateLobbyRequest {
  playerName: string;
}

interface CheckLobbyRequest {
  playerName: string;
}

export type RequestBody = CreateLobbyRequest | CheckLobbyRequest;
