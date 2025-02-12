import { useState } from 'react';
import { Box, Button, Grid2, Stack, Typography } from '@mui/material';
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
    <Stack height="80vh" display="flex" flexDirection="column">
      <Grid2 container>
        <Grid2 size={6}>
          <Typography variant="h6">Role</Typography>
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h6">Location</Typography>
        </Grid2>
        <Grid2 size={6}>
          <RoleDisplay role={role} />
        </Grid2>
        <Grid2 size={6}>
          <LocationDisplay location={isSpy ? '???' : location} />
        </Grid2>
      </Grid2>
      <Box sx={{ flexGrow: 1 }}>
        <NotesTabs
          locations={gameState.possibleLocations}
          players={gameState.players}
          isSpy={isSpy}
        />
      </Box>
      {gameOver ? (
        <Stack spacing={1}>
          {isCreator ? (
            <Button variant="contained" onClick={returnToLobbyEvent}>
              RETURN TO LOBBY
            </Button>
          ) : (
            <Typography>waiting for host...</Typography>
          )}
          <Button variant="contained" color="secondary" onClick={onLeaveGame}>
            LEAVE GAME
          </Button>
        </Stack>
      ) : (
        <GameTimer startTime={gameState.startTime!} duration={duration} setGameOver={setGameOver} />
      )}
    </Stack>
  );
}

export default RolePane;
