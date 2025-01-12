import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export enum GameState {
  CREATED,
  IN_PROGRESS,
  ENDED
}

interface Player {
  uuid: string;
  name: string;
}

export const useGameStateManager = () => {
  const { sendJsonMessage, lastMessage /*readyState*/ } = useWebSocket(
    import.meta.env.VITE_REACT_APP_WEBSOCKET
  );
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    switch (lastMessage?.type) {
      case 'PLAYER_JOIN': {
        const player: Player = {
          uuid: lastMessage.data['player'],
          name: lastMessage.data['name']
        };
        setPlayers((prev) => [...prev, player]);
        break;
      }
      case 'PLAYER_LEAVE':
        break;
    }
  }, [lastMessage]);

  const playerRenameEvent = (uuid: string, name: string) => {
    sendJsonMessage({
      type: 'PLAYER_RENAME',
      data: {
        player: uuid,
        name: name
      }
    });
  };

  const sendEvent = {
    playerRenameEvent
  };

  return {
    players,
    sendEvent
    // readyState
  };
};
