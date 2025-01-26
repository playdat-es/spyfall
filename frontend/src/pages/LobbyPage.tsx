import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { ArrowBackIosNew, ContactMail } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerListItem from '../molecules/PlayerListItem';
import { GamePageProps } from './GamePage.tsx';

type LobbyPageProps = GamePageProps & {
  playerRenameEvent: (newName: string) => void;
  startGameEvent: () => void;
};
function LobbyPage({ gameState, playerRenameEvent, startGameEvent }: LobbyPageProps) {
  const navigate = useNavigate();
  const { lobbyId } = useParams();

  const isCreator = gameState.creator === localStorage.getItem('playerId');

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
            rename={playerRenameEvent}
            creator={gameState.creator}
          />
        ))}
      </List>
      {isCreator && (
        <Button onClick={startGameEvent} disabled={gameState.players.length < 3}>
          Start Game
        </Button>
      )}
      {!isCreator && <Typography>Waiting for Host...</Typography>}
    </Box>
  );
}

export default LobbyPage;
