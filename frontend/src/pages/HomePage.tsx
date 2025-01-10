import { useState } from 'react';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import spyfallLogo from '../assets/react.svg';

const lobbyCodeModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  color: 'black',
  borderRadius: '10px',
  p: 4,
  textAlign: 'center'
};

// DUMMY DATA - simulating fetching all lobbies from server
// IRL - ask server to find the user's inputted code then return true/false
const lobbies = [{ code: 'ABCDEF' }, { code: '123456' }, { code: '000000' }];

function HomePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Call server to create lobby and navigate to lobby page with lobby code
  // DEBUG CODE: lobby code is a random six digit number
  const handleCreateLobby = () => {
    const lobbyCode = Math.floor(100000 + Math.random() * 900000);
    navigate(`/${lobbyCode}`);
  };

  // Call server to see if a lobby with lobbyCode exists
  // Return true if it exists; otherwise false
  // DEBUG CODE: lobby code is a random six digit number
  const handleCodeChange = (lobbyCode: string) => {
    // lobbyCode must be of length 6 (may change later)
    if (lobbyCode.length != 6) {
      return;
    }
    for (const lobby of lobbies) {
      if (lobby.code == lobbyCode) {
        navigate(`/${lobbyCode}`);
      }
    }
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
        <Box sx={lobbyCodeModalStyle}>
          <Typography variant="h4" component="label" gutterBottom>
            Enter Lobby Code
          </Typography>
          <TextField placeholder="Lobby Code" autoComplete="off" fullWidth onChange={(text) => handleCodeChange(text.target.value)} />
        </Box>
      </Modal>
    </Box>
  );
}

export default HomePage;
