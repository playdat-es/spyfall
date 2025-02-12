import { useNavigate, useParams } from 'react-router-dom';
import { GameStateType, useGameStateManager } from '../utils/hooks/useGameStateManager';
import { SyntheticEvent, useEffect, useState } from 'react';
import { LobbyStatus } from '../utils/models.ts';
import LobbyPane from '../organisms/LobbyPane.tsx';
import RolePane from '../organisms/RolePane.tsx';
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Slide,
  Snackbar,
  SnackbarCloseReason,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowBackIosNew, ContentCopy } from '@mui/icons-material';

export interface GamePageProps {
  gameState: GameStateType;
  status?: LobbyStatus;
}

function GamePage() {
  const navigate = useNavigate();
  const { lobbyId } = useParams();
  const [showCopied, setShowCopied] = useState(false);

  const { gameState, sendEvent, socketState } = useGameStateManager(navigate);
  const status = gameState.startTime ? LobbyStatus.IN_PROGRESS : LobbyStatus.NOT_STARTED;

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
    <Box>
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
      <Box>
        <Stack direction="row" spacing={2}>
          <IconButton edge="start" aria-label="back" onClick={() => navigate('/')} disableRipple>
            <ArrowBackIosNew />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant="text" endIcon={<ContentCopy />} onClick={onCopyLobbyCode}>
              <Typography variant="h6">Code: {lobbyId}</Typography>
            </Button>
          </Box>
        </Stack>
      </Box>
      <Divider />

      {status === LobbyStatus.NOT_STARTED && (
        <LobbyPane
          gameState={gameState!}
          playerRenameEvent={sendEvent.playerRenameEvent}
          kickPlayerEvent={sendEvent.kickPlayerEvent}
          startGameEvent={sendEvent.startGameEvent}
        />
      )}
      {status === LobbyStatus.IN_PROGRESS && (
        <RolePane gameState={gameState!} returnToLobbyEvent={sendEvent.returnToLobbyEvent} />
      )}
    </Box>
  );
}

export default GamePage;
