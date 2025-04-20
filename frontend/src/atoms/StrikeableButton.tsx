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
    <Tooltip title={tooltip ?? ''} arrow>
      <Button onClick={toggleStrikethrough} sx={{ width: '100%', height: '32px' }}>
        <Typography
          style={{ textDecoration: strikethrough ? 'line-through' : 'none', fontSize: 19 }}
          color={strikethrough ? 'textDisabled' : 'inherit'}
        >
          {text}
        </Typography>
        {icon}
      </Button>
    </Tooltip>
  );
}

export default StrikeableButton;
