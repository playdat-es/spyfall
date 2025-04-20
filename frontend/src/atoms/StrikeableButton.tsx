import { Button, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

interface StrikeableButtonProps {
  text: string;
  icon?: React.ReactNode;
  tooltip?: string;
}

function StrikeableButton({ text, icon, tooltip }: StrikeableButtonProps) {
  const [strikethrough, setStrikethrough] = useState<boolean>(false);
  const toggleStrikethrough = () => {
    setStrikethrough((prev) => !prev);
  };

  return (
    <Button onClick={toggleStrikethrough} sx={{ width: '100%', height: '32px' }}>
      <Tooltip title={tooltip ?? ''} enterDelay={500} arrow>
        <Typography
          style={{ textDecoration: strikethrough ? 'line-through' : 'none', fontSize: 19 }}
          color={strikethrough ? 'textDisabled' : 'inherit'}
        >
          {text}
        </Typography>
      </Tooltip>
      {icon}
    </Button>
  );
}

export default StrikeableButton;
