import { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Timer } from '@mui/icons-material';

interface GameTimerProps {
  startTime: number;
  duration: number;
  setGameOver: (b: boolean) => void;
}

function GameTimer({ startTime, duration, setGameOver }: GameTimerProps) {
  const intervalRef = useRef(0);
  const [timer, setTimer] = useState('');

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
    const currTime = new Date(startTime * 1000);
    currTime.setSeconds(currTime.getSeconds() + duration);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      updateTimer(currTime);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <Button variant="contained" disabled sx={{ height: '47px' }}>
      <Timer />
      {timer ? timer : <CircularProgress size={24} color="inherit" />}
    </Button>
  );
}

export default GameTimer;
