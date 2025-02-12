import { Box, Button, List, Typography } from '@mui/material';
import PlayerListItem from '../molecules/PlayerListItem.tsx';
import { GamePageProps } from '../pages/GamePage.tsx';

type LobbyPaneProps = GamePageProps & {
  playerRenameEvent: (newName: string) => void;
  kickPlayerEvent: () => void;
  startGameEvent: () => void;
};
function LobbyPane({
  gameState,
  playerRenameEvent,
  kickPlayerEvent,
  startGameEvent,
}: LobbyPaneProps) {
  const isCreator = gameState.creator === localStorage.getItem('playerId');

  return (
    <Box>
      <List>
        {gameState.players.map((player) => (
          <PlayerListItem
            key={player.id}
            player={player}
            rename={playerRenameEvent}
            kick={kickPlayerEvent}
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

export default LobbyPane;
