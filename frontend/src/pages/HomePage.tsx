import { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import spyfallLogo from '../assets/logo.svg';
import { PLAYER_NAME_LENGTH, post, uuid } from '../utils/utils.ts';
import LobbyCodeDialog from '../molecules/LobbyCodeDialog.tsx';

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem('playerName') || '');
  const [showLobbyCodeModal, setShowLobbyCodeModal] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/`, { method: 'GET' });
  }, []);

  const handleCreateLobby = () => {
    fetch(
      `${import.meta.env.VITE_API_BASE_URL}/lobby`,
      post({ playerName: name.trim(), playerId: localStorage.getItem('playerId') || uuid() }),
    )
      .then((response) => response.json())
      .then((json) => {
        if (json['lobbyId']) {
          localStorage.setItem('playerId', json['playerId']);
          localStorage.setItem('playerName', json['playerName']);
          navigate(`/${json['lobbyId']}`);
        } else {
          console.error(json);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <Box>
      <img style={{ height: '8em' }} src={spyfallLogo} className="logo" alt="Spyfall logo" />
      <Typography variant="h4" sx={{ my: 4 }}>
        Spyfall
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Enter Your Name"
          placeholder="Player Name"
          defaultValue={localStorage.getItem('playerName')}
          slotProps={{ htmlInput: { maxLength: PLAYER_NAME_LENGTH } }}
          autoComplete="off"
          fullWidth
          onChange={(text) => setName(text.target.value)}
        />
      </Box>
      <Stack spacing={1}>
        <Button variant="contained" disabled={!name} onClick={handleCreateLobby}>
          Create Lobby
        </Button>
        <Button variant="contained" disabled={!name} onClick={() => setShowLobbyCodeModal(true)}>
          Join Lobby
        </Button>
      </Stack>
      <LobbyCodeDialog
        open={showLobbyCodeModal}
        onClose={() => setShowLobbyCodeModal(false)}
        playerName={name}
      />
    </Box>
  );
}

export default HomePage;
