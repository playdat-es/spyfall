import { Button, List, Stack } from '@mui/material';
import PlayerListItem from '../molecules/PlayerListItem.tsx';
import { GamePageProps } from '../pages/GamePage.tsx';
import { useMemo } from 'react';

type LobbyPaneProps = GamePageProps & {
  playerRenameEvent: (newName: string) => void;
  kickPlayerEvent: (playerId: string) => void;
  startGameEvent: () => void;
};
function LobbyPane({
  gameState,
  playerRenameEvent,
  kickPlayerEvent,
  startGameEvent,
}: LobbyPaneProps) {
  const isCreator = gameState.creator === localStorage.getItem('playerId');

  const canStart = gameState.players.length >= 3;
  const buttonText = useMemo(() => {
    if (!canStart) {
      return 'Not enough players!';
    } else {
      return isCreator ? 'Start Game' : 'Waiting for host...';
    }
  }, [canStart, isCreator]);

  return (
    <Stack height="100%" px={2} justifyContent="space-between">
      <List sx={{ flexGrow: 1, maxHeight: '80vh', overflowY: 'auto' }}>
        {gameState.players.map((player) => (
          <PlayerListItem
            key={player.id + player.name}
            player={player}
            creator={gameState.creator}
            playerRenameEvent={playerRenameEvent}
            kickPlayerEvent={kickPlayerEvent}
          />
        ))}
      </List>
      <Button
        onClick={startGameEvent}
        disabled={!isCreator || !canStart}
        variant="contained"
        sx={{ my: 2 }}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}

export default LobbyPane;
