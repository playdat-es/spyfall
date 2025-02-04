import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ArrowBackIosNew, ContactMail } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerListItem from '../molecules/PlayerListItem';
import { useGameStateManager } from '../hooks/useGameStateManager';
import { useEffect } from 'react';

function LobbyPage() {
  const navigate = useNavigate();
  const { lobbyId } = useParams();

  const { gameState, socketState, sendEvent } = useGameStateManager();

  useEffect(() => {
    if (socketState === WebSocket.OPEN) {
      sendEvent.playerJoinEvent(lobbyId!);
    }
  }, [socketState]);

  return (
    <Box>
      <List>
        <ListItem divider>
          <IconButton edge="start" aria-label="back" onClick={() => navigate('/')}>
            <ArrowBackIosNew />
          </IconButton>
          <ListItemIcon>
            <ContactMail />
          </ListItemIcon>
          <ListItemText primary={lobbyId} />
        </ListItem>
        {gameState.players.map((player) => (
          <PlayerListItem
            key={player.id}
            player={player}
            rename={sendEvent.playerRenameEvent}
            creator={gameState.creator}
          />
        ))}
      </List>
    </Box>
  );
}

export default LobbyPage;
