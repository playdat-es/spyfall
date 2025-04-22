import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface CloseDialogButtonProps {
  onClick: () => void;
}

function CloseDialogButton({ onClick }: CloseDialogButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: 12,
        top: 12,
        fill: 'currentcolor',
      }}
    >
      <Close />
    </IconButton>
  );
}

export default CloseDialogButton;
