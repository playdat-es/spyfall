import { useState } from 'react';
import { Button, Grid2, Stack, Typography } from '@mui/material';
import { GamePageProps } from '../pages/GamePage.tsx';
import { useNavigate } from 'react-router-dom';
import NotesTabs from '../molecules/NotesTabs.tsx';
import GameTimer from '../molecules/GameTimer.tsx';
import RoleDisplay from '../atoms/RoleDisplay.tsx';
import LocationDisplay from '../atoms/LocationDisplay.tsx';

type RolePaneProps = GamePageProps & {
  returnToLobbyEvent: () => void;
};
function RolePane({ gameState, returnToLobbyEvent }: RolePaneProps) {
  const navigate = useNavigate();
  const [gameOver, setGameOver] = useState(false);

  const player = gameState.players.find((player) => player.id === localStorage.getItem('playerId'));
  const role = player?.role ?? '';
  const location = gameState.location ?? '';
  const duration = gameState.duration ?? 0;
  const isCreator = gameState.creator === localStorage.getItem('playerId');
  const isSpy = role == 'Spy';

  const onLeaveGame = () => {
    navigate('/');
  };

  return (
    <Stack height="100%" px={2} justifyContent="space-between">
      <Grid2 container>
        <Grid2 size={6}>
          <Typography variant="h7">Role</Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h7">Location</Typography>
        </Grid2>
        <Grid2 size={6}>
          <RoleDisplay role={role} />
        </Grid2>
        <Grid2 size={6}>
          <LocationDisplay location={isSpy ? '???' : location} />
        </Grid2>
      </Grid2>
      <NotesTabs
        locations={gameState.possibleLocations}
        players={gameState.players}
        isSpy={isSpy}
      />
      <Stack pb={2}>
        {gameOver ? (
          <Stack spacing={1}>
            <Button onClick={returnToLobbyEvent} disabled={!isCreator} variant="contained">
              {isCreator ? 'Return to Lobby' : 'Waiting for host...'}
            </Button>
            <Button
              onClick={onLeaveGame}
              variant="contained"
              color="secondary"
              sx={{ color: 'primary.main' }}
            >
              Leave Game
            </Button>
          </Stack>
        ) : (
          <GameTimer
            startTime={gameState.startTime!}
            duration={duration}
            setGameOver={setGameOver}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default RolePane;
