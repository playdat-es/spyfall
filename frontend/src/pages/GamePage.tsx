import { useNavigate, useParams } from 'react-router-dom';
import { useGameStateManager } from '../hooks/useGameStateManager';
import { useEffect } from 'react';
import { Lobby, LobbyStatus } from '../utils/models.ts';
import LobbyPane from '../organisms/LobbyPane.tsx';
import RolePane from '../organisms/RolePane.tsx';
import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ArrowBackIosNew, ContactMail } from '@mui/icons-material';

export interface GamePageProps {
  gameState: Omit<Lobby, 'id'> & { status?: LobbyStatus };
}

function GamePage() {
  const navigate = useNavigate();
  const { lobbyId } = useParams();

  const { gameState, sendEvent, socketState } = useGameStateManager();
  const status = gameState.start_time ? LobbyStatus.IN_PROGRESS : LobbyStatus.NOT_STARTED;

  useEffect(() => {
    if (socketState === WebSocket.OPEN) {
      sendEvent.playerJoinEvent(lobbyId!);
    }
  }, [socketState]);

  return (
    <>
      <ListItem divider>
        <IconButton edge="start" aria-label="back" onClick={() => navigate('/')}>
          <ArrowBackIosNew />
        </IconButton>
        <ListItemIcon>
          <ContactMail />
        </ListItemIcon>
        <ListItemText primary={lobbyId} />
      </ListItem>
      {status === LobbyStatus.NOT_STARTED && (
        <LobbyPane
          gameState={gameState!}
          playerRenameEvent={sendEvent.playerRenameEvent}
          startGameEvent={sendEvent.startGameEvent}
        />
      )}
      {status === LobbyStatus.IN_PROGRESS && (
        <RolePane gameState={gameState!} returnToLobbyEvent={sendEvent.returnToLobbyEvent} />
      )}
    </>
  );
}

export default GamePage;
