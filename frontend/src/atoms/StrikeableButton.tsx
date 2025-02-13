import { Button, Typography } from '@mui/material';
import { useState } from 'react';

interface StrikeableButtonProps {
  text: string;
}

function StrikeableButton({ text }: StrikeableButtonProps) {
  const [strikethrough, setStrikethrough] = useState<boolean>(false);
  const toggleStrikethrough = () => {
    setStrikethrough((prev) => !prev);
  };

  return (
    <Button onClick={toggleStrikethrough} sx={{ width: '100%', height: '100%' }}>
      <Typography
        style={{ textDecoration: strikethrough ? 'line-through' : 'none', fontSize: 24 }}
        color={strikethrough ? 'textDisabled' : 'inherit'}
      >
        {text}
      </Typography>
    </Button>
  );
}

export default StrikeableButton;
