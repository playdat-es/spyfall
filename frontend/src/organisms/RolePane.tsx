import { useEffect, useRef, useState } from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { Face } from '@mui/icons-material';
import RoleLocationDisplay from '../molecules/RoleLocationDisplay.tsx';
import { GamePageProps } from '../pages/GamePage.tsx';
import { useNavigate } from 'react-router-dom';

type RolePaneProps = GamePageProps & {
  returnToLobbyEvent: () => void;
};
function RolePane({ gameState, returnToLobbyEvent }: RolePaneProps) {
  const navigate = useNavigate();
  const intervalRef = useRef(0);
  const [timer, setTimer] = useState('XX:XX');
  const [gameOver, setGameOver] = useState(false);

  const player = gameState.players.find((player) => player.id === localStorage.getItem('playerId'));
  const role = player?.role ?? '';
  const location = gameState.location ?? '';
  const duration = gameState.duration ?? 0;
  const isCreator = gameState.creator === localStorage.getItem('playerId');

  const getTimeRemaining = (currTime: Date) => {
    const total = Date.parse(currTime.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, seconds, minutes };
  };

  const updateTimer = (currTime: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(currTime);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : '0' + minutes) + ':' + (seconds > 9 ? seconds : '0' + seconds),
      );
    } else {
      setGameOver(true);
      clearInterval(intervalRef.current);
    }
  };

  const startTimer = () => {
    const currTime = new Date();
    currTime.setSeconds(currTime.getSeconds() + duration);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      updateTimer(currTime);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, []);

  const onLeaveGame = () => {
    navigate('/');
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ my: 1 }}>
        <Face />
        <Typography>{player?.name}</Typography>
      </Stack>
      <Divider />
      <RoleLocationDisplay role={role} location={location} />
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
        <Button variant="contained" disabled>
          Timer: {timer}
        </Button>
      )}
    </Stack>
  );
}

export default RolePane;
