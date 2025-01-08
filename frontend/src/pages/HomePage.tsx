import { useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material"

function HomePage() {
  const [filled, setFilled] = useState(false)

  return (
    <Box>
      <div>IMAGE</div>
      <Typography variant="h3" gutterBottom>
        Spyfall
      </Typography>
      <Box sx={{ mb: 2 }}>
        <div>Enter Your Name</div>
        <TextField
          placeholder="Player Name"
          autoComplete="off"
          onChange={(text) => setFilled(Boolean(text.target.value))}
        />
      </Box>
      <Stack spacing={1}>
        <Button variant="contained" disabled={!filled}>Create Lobby</Button>
        <Button variant="contained"disabled={!filled}>Join Lobby</Button>
      </Stack>
    </Box>
  )
}

export default HomePage
