import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ArrowBackIosNew, ContactMail } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerListItem from '../molecules/PlayerListItem';
import { useGameStateManager } from '../hooks/useGameStateManager';
import { useEffect } from 'react';

function LobbyPage() {
  const navigate = useNavigate();
  const { lobbyCode } = useParams();

  const { gameState, socketState, sendEvent } = useGameStateManager();

  useEffect(() => {
    if (socketState === WebSocket.OPEN) {
      sendEvent.playerJoinEvent(lobbyCode!);
    }
  }, [socketState]);
  console.log(gameState.creator);
  console.log(localStorage.getItem('playerId'));

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
          <ListItemText primary={lobbyCode} />
        </ListItem>
        {gameState.players.map((player) => (
          <PlayerListItem
            key={player.id}
            playerName={player.name}
            isCreator={player.id === gameState.creator}
            canEdit={player.id === localStorage.getItem('playerId')}
            canKick={localStorage.getItem('playerId') === gameState.creator}
          />
        ))}
      </List>
    </Box>
  );
}

export default LobbyPage;
