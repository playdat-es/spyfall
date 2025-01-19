import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

interface Player {
  id: string;
  name: string;
}

export const useGameStateManager = () => {
  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState: socketState
  } = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL);
  const [players, setPlayers] = useState<Player[]>([]);
  const [creator, setCreator] = useState<string>();

  const handleLobbyState = (players: Player[], creator: string) => {
    setPlayers(players);
    setCreator(creator);
  };

  const handlePlayerJoin = (id: string, name: string) => {
    const newPlayer: Player = {
      id: id,
      name: name
    };
    if (players.some((player) => player.id === id)) return;
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const handlePlayerLeave = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
    // todo: this should return client to home page if receiving leave with own id
  };

  const handlePlayerRename = (playerId: string, newName: string) => {
    const renamedPlayer: Player = {
      id: playerId,
      name: newName
    };
    setPlayers(players.map((player) => (player.id !== playerId ? player : renamedPlayer)));
  };

  useEffect(() => {
    console.log(lastJsonMessage);
    switch (lastJsonMessage?.type) {
      case 'LOBBY_STATE': {
        handleLobbyState(lastJsonMessage.data['players'], lastJsonMessage.data['creator']);
        break;
      }
      case 'PLAYER_JOIN': {
        handlePlayerJoin(lastJsonMessage.data['playerId'], lastJsonMessage.data['playerName']);
        break;
      }
      case 'PLAYER_LEAVE': {
        handlePlayerLeave(lastJsonMessage.data['playerId']);
        break;
      }
      case 'PLAYER_RENAME': {
        handlePlayerRename(lastJsonMessage.data['playerId'], lastJsonMessage.data['playerName']);
        break;
      }
    }
  }, [lastJsonMessage]);

  const playerJoinEvent = (lobbyCode: string) => {
    sendJsonMessage({
      type: 'PLAYER_JOIN',
      data: {
        lobbyCode: lobbyCode,
        playerId: localStorage.getItem('playerId'),
        playerName: localStorage.getItem('playerName')
      }
    });
  };

  const playerLeaveEvent = (lobbyCode: string, playerId: string) => {
    sendJsonMessage({
      type: 'PLAYER_LEAVE',
      data: {
        lobbyCode: lobbyCode,
        playerId: playerId
      }
    });
  };

  const playerRenameEvent = (newName: string) => {
    sendJsonMessage({
      type: 'PLAYER_RENAME',
      data: {
        playerId: localStorage.getItem('playerId'),
        playerName: newName
      }
    });
  };

  const sendEvent = {
    playerJoinEvent,
    playerLeaveEvent,
    playerRenameEvent
  };

  const gameState = {
    players,
    creator
  };

  return {
    gameState,
    sendEvent,
    socketState
  };
};
