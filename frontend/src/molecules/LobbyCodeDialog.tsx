import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LOBBY_CODE_LENGTH, post, sanitizeLobbyCode, uuid } from '../utils/utils.ts';
import CloseDialogButton from '../atoms/CloseDialogButton.tsx';

interface LobbyCodeDialogProps {
  open: boolean;
  onClose: () => void;
  playerName: string;
}

function LobbyCodeDialog({ open, onClose, playerName }: LobbyCodeDialogProps) {
  const navigate = useNavigate();
  const [disableCodeField, setDisableCodeField] = useState(false);
  const [codeHelperText, setCodeHelperText] = useState(' ');

  const onDialogClose = () => {
    onClose();
    setCodeHelperText(' ');
  };

  const handleCodeChange = (code: string) => {
    code = sanitizeLobbyCode(code);
    if (code.length != LOBBY_CODE_LENGTH) {
      setCodeHelperText('Code is 4 characters');
      return;
    }
    setDisableCodeField(true);
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/lobby/${code}`,
      post({ playerName: playerName.trim(), playerId: localStorage.getItem('playerId') || uuid() }),
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.lobbyId) {
          localStorage.setItem('playerId', json.playerId);
          localStorage.setItem('playerName', json.playerName);
          navigate(`/${code}`);
        } else {
          console.error(json);
          setCodeHelperText('Invalid Code');
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setDisableCodeField(false));
  };

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>
        Enter Lobby Code
        <CloseDialogButton onClick={onClose} />
      </DialogTitle>
      <DialogContent sx={{ py: 0 }}>
        <TextField
          fullWidth
          slotProps={{ htmlInput: { style: { textTransform: 'uppercase' } } }}
          helperText={codeHelperText}
          error={!!codeHelperText.trim()}
          disabled={disableCodeField}
          onChange={(event) => handleCodeChange(event.target.value)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default LobbyCodeDialog;
