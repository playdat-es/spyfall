import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { PLAYER_NAME_LENGTH } from '../utils/utils.ts';

interface PlayerRenameDialogProps {
  open: boolean;
  onClose: () => void;
  currentName: string;
  playerRenameEvent: (newName: string) => void;
}

function PlayerRenameDialog({
  open,
  onClose,
  currentName,
  playerRenameEvent,
}: PlayerRenameDialogProps) {
  const [newName, setNewName] = useState(currentName);

  const onRename = () => {
    playerRenameEvent(newName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Name</DialogTitle>
      <DialogContent>
        <TextField
          defaultValue={currentName}
          slotProps={{ htmlInput: { maxLength: PLAYER_NAME_LENGTH } }}
          autoComplete="off"
          onChange={(text) => setNewName(text.target.value.trim())}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onRename}
          disabled={newName === currentName || !newName}
          sx={{ width: 120 }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PlayerRenameDialog;
