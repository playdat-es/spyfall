import { useState } from "react";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material"
import spyfallLogo from '../assets/react.svg'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  color: 'black',
  borderRadius: '10px',
  p: 4,
  textAlign: 'center',
};

function HomePage() {
  const [filled, setFilled] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <Box>
      <img style={{height: '8em'}} src={spyfallLogo} className="logo" alt="Spyfall logo" />
      <Typography variant="h4" sx={{ my: 4 }}>
        Spyfall
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Enter Your Name
        </Typography>
        <TextField
          placeholder="Player Name"
          autoComplete="off"
          fullWidth 
          onChange={(text) => setFilled(Boolean(text.target.value))}
        />
      </Box>
      <Stack spacing={1}>
        <Button variant="contained" disabled={!filled}>Create Lobby</Button>
        <Button variant="contained" disabled={!filled} onClick={() => setOpen(true)}>Join Lobby</Button>
      </Stack>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <Typography variant="h4" gutterBottom>
            Enter Lobby Code
          </Typography>
          <TextField
            placeholder="Lobby Code"
            autoComplete="off"
            fullWidth
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default HomePage
