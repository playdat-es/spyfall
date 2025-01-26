import { useParams } from 'react-router-dom';
import { useGameStateManager } from '../hooks/useGameStateManager';
import { useEffect } from 'react';
import { Lobby, LobbyStatus } from '../utils/models.ts';
import LobbyPage from './LobbyPage.tsx';
import RolePage from './RolePage.tsx';

export interface GamePageProps {
  gameState: Omit<Lobby, 'id'> & { status?: LobbyStatus };
}

function GamePage() {
  const { lobbyId } = useParams();

  const { gameState, sendEvent, socketState } = useGameStateManager();

  useEffect(() => {
    if (socketState === WebSocket.OPEN) {
      sendEvent.playerJoinEvent(lobbyId!);
    }
  }, [socketState]);

  return (
    <>
      {gameState.status === LobbyStatus.CREATED && (
        <LobbyPage
          gameState={gameState!}
          playerRenameEvent={sendEvent.playerRenameEvent}
          startGameEvent={sendEvent.startGameEvent}
        />
      )}
      {gameState.status === LobbyStatus.IN_PROGRESS && <RolePage gameState={gameState!} />}
      {gameState.status === LobbyStatus.COMPLETED && 'completed'}
    </>
  );
}

export default GamePage;
