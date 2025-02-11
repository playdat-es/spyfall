import { useNavigate, useParams } from 'react-router-dom';
import { useGameStateManager } from '../hooks/useGameStateManager';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Lobby, LobbyStatus } from '../utils/models.ts';
import LobbyPane from '../organisms/LobbyPane.tsx';
import RolePane from '../organisms/RolePane.tsx';
import {
  Alert,
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  Slide,
  Snackbar,
  SnackbarCloseReason,
} from '@mui/material';
import { ArrowBackIosNew, ContactMail, ContentCopy } from '@mui/icons-material';

export interface GamePageProps {
  gameState: Omit<Lobby, 'id'> & { status?: LobbyStatus };
}

function GamePage() {
  const navigate = useNavigate();
  const { lobbyId } = useParams();
  const [showCopied, setShowCopied] = useState(false);

  const { gameState, sendEvent, socketState } = useGameStateManager(navigate);
  const status = gameState.start_time ? LobbyStatus.IN_PROGRESS : LobbyStatus.NOT_STARTED;

  useEffect(() => {
    if (socketState === WebSocket.OPEN) {
      sendEvent.playerJoinEvent(lobbyId!);
    }
  }, [socketState]);

  const onCopyLobbyCode = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
  };

  const onCloseCopied = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowCopied(false);
  };

  return (
    <>
      <Snackbar
        open={showCopied}
        onClose={onCloseCopied}
        autoHideDuration={2000}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={onCloseCopied} severity="success" variant="filled">
          Invite link copied!
        </Alert>
      </Snackbar>
      <ListItem divider>
        <IconButton edge="start" aria-label="back" onClick={() => navigate('/')}>
          <ArrowBackIosNew />
        </IconButton>
        <ListItemIcon>
          <ContactMail />
        </ListItemIcon>
        <Button variant="outlined" endIcon={<ContentCopy />} onClick={onCopyLobbyCode}>
          {lobbyId}
        </Button>
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
