export const LOBBY_CODE_LENGTH = 4;

export const sanitizeLobbyCode = (code: string) => {
  return code
    .trim()
    .replace(/[^0-9a-z]+/gi, '')
    .toUpperCase()
    .substring(0, LOBBY_CODE_LENGTH);
};

interface CreateLobbyRequest {
  playerName: string;
}

interface CheckLobbyRequest {
  playerName: string;
}

type RequestBody = CreateLobbyRequest | CheckLobbyRequest;

export const post = (body: RequestBody) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};
