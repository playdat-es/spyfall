import { RequestBody } from './models.ts';

export const LOBBY_CODE_LENGTH = 4;

export const sanitizeLobbyCode = (code: string) => {
  return code
    .trim()
    .replace(/[^0-9a-z]+/gi, '')
    .toUpperCase()
    .substring(0, LOBBY_CODE_LENGTH);
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

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  color: 'black',
  borderRadius: '10px',
  p: 4,
  textAlign: 'center',
};
