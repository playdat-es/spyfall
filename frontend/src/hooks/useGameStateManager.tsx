import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { Player } from '../utils/models.ts';

interface JsonMessage {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };
}

export const useGameStateManager = () => {
  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState: socketState,
  } = useWebSocket(import.meta.env.VITE_WEBSOCKET_URL);
  const [players, setPlayers] = useState<Player[]>([]);
  const [creator, setCreator] = useState<string>('');

  const handleLobbyState = (players: Player[], creator: string) => {
    setPlayers(players);
    setCreator(creator);
  };

  const handlePlayerJoin = (id: string, name: string, dedupe: number) => {
    const newPlayer: Player = {
      id: id,
      name: name,
      dedupe: dedupe,
    };
    if (players.some((player) => player.id === id)) return;
    setPlayers((prev) => [...prev, newPlayer]);
  };

  const handlePlayerLeave = (id: string) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const handlePlayerRename = (playerId: string, newName: string, dedupe: number) => {
    const renamedPlayer: Player = {
      id: playerId,
      name: newName,
      dedupe: dedupe,
    };
    setPlayers(players.map((player) => (player.id !== playerId ? player : renamedPlayer)));
    if (playerId === localStorage.getItem('playerId')) {
      localStorage.setItem('playerName', newName);
    }
  };

  useEffect(() => {
    const message = lastJsonMessage as JsonMessage;
    const data = message?.data;
    switch (message?.type) {
      case 'LOBBY_STATE': {
        handleLobbyState(data['players'], data['creator']);
        break;
      }
      case 'PLAYER_JOIN': {
        handlePlayerJoin(data['playerId'], data['playerName'], data['dedupe']);
        break;
      }
      case 'PLAYER_LEAVE': {
        handlePlayerLeave(data['playerId']);
        break;
      }
      case 'PLAYER_RENAME': {
        handlePlayerRename(data['playerId'], data['playerName'], data['dedupe']);
        break;
      }
    }
  }, [lastJsonMessage]);

  const playerJoinEvent = (lobbyId: string) => {
    sendJsonMessage({
      type: 'PLAYER_JOIN',
      data: {
        lobbyId: lobbyId,
        playerId: localStorage.getItem('playerId'),
        playerName: localStorage.getItem('playerName'),
      },
    });
  };

  const playerRenameEvent = (newName: string) => {
    sendJsonMessage({
      type: 'PLAYER_RENAME',
      data: {
        playerId: localStorage.getItem('playerId'),
        playerName: newName,
      },
    });
  };

  const sendEvent = {
    playerJoinEvent,
    playerRenameEvent,
  };

  const gameState = {
    players,
    creator,
  };

  return {
    gameState,
    sendEvent,
    socketState,
  };
};
