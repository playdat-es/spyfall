import { v4 as uuidv4 } from 'uuid';
import { RequestBody } from './models.ts';

export const LOBBY_CODE_LENGTH = 4;
export const PLAYER_NAME_LENGTH = 24;

export const sanitizeLobbyCode = (code: string) => {
  return code
    .trim()
    .replace(/[^0-9a-z]+/gi, '')
    .toUpperCase();
};

export const uuid = () => {
  return uuidv4().replace(/-/g, '');
};

export const post = (body: RequestBody) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
};
