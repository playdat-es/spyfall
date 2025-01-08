import { useState } from "react";
import { Box, Button, colors, Modal, Stack, TextField, Typography } from "@mui/material"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  color: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function HomePage() {
  const [filled, setFilled] = useState(false)
  const [open, setOpen] = useState(false)

  const handleLobbyCode = () => {
    console.log("hello")
  }

  return (
    <Box>
      <div>IMAGE</div>
      <Typography variant="h3" gutterBottom>
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
          <Typography variant="h3" gutterBottom>
            Enter Lobby Code
          </Typography>
          <TextField
            placeholder="Lobby Code"
            autoComplete="off"
            fullWidth
            onChange={handleLobbyCode}
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default HomePage
