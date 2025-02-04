import { useState } from 'react';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import spyfallLogo from '../assets/react.svg';

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [disableCodeField, setDisableCodeField] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [codeHelperText, setCodeHelperText] = useState('Code is 4 characters');

  const handleCreateLobby = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/lobby`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerName: name
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json['lobbyId']) {
          localStorage.setItem('playerId', json['playerId']);
          localStorage.setItem('playerName', name);
          navigate(`/${json['lobbyId']}`);
        } else {
          console.error(json);
        }
      })
      .catch((error) => console.error(error));
  };

  // Call server to validate inputted lobby code
  // If valid, join lobby with that code
  const handleCodeChange = (code: string) => {
    setCodeError(false);
    setCodeHelperText('Code is 4 characters');
    // lobbyCode must be of length 4
    if (code.length != 4) {
      return;
    }
    setDisableCodeField(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/lobby/${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerName: name
      })
    })
      .then((response) => response.json())
      .then((json) => {
        if (json['lobbyId']) {
          localStorage.setItem('playerId', json['playerId']);
          localStorage.setItem('playerName', name);
          navigate(`/${code}`);
        } else {
          console.error(json);
          setCodeError(true);
          setCodeHelperText('Invalid Code');
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setDisableCodeField(false));
  };

  return (
    <Box>
      <img style={{ height: '8em' }} src={spyfallLogo} className="logo" alt="Spyfall logo" />
      <Typography variant="h4" sx={{ my: 4 }}>
        Spyfall
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" component="label" gutterBottom>
          Enter Your Name
        </Typography>
        <TextField
          placeholder="Player Name"
          autoComplete="off"
          fullWidth
          onChange={(text) => setName(text.target.value)}
        />
      </Box>
      <Stack spacing={1}>
        <Button variant="contained" disabled={!name} onClick={handleCreateLobby}>
          Create Lobby
        </Button>
        <Button variant="contained" disabled={!name} onClick={() => setShowModal(true)}>
          Join Lobby
        </Button>
      </Stack>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box>
          <Typography variant="h4" component="label" gutterBottom>
            Enter Lobby Code
          </Typography>
          <TextField
            placeholder="Lobby Code"
            autoComplete="off"
            fullWidth
            slotProps={{ htmlInput: { maxLength: 4 } }}
            helperText={codeHelperText}
            error={codeError}
            disabled={disableCodeField}
            onChange={(text) => handleCodeChange(text.target.value)}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default HomePage;
