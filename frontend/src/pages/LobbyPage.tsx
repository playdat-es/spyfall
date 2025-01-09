import { Box, Divider, IconButton, List, Stack, Typography } from "@mui/material"
import { ArrowBackIosNew, ContactMail } from "@mui/icons-material"
import PlayerListItem from "../molecules/PlayerListItem"

function LobbyPage() {
    // Fetch players in lobby here
    const leader = 'Someone'
    const players = ['Noby', 'Stephen', 'James', 'Amy']
  
    return (
      <Box>
        <Stack direction='row' spacing={1}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <IconButton>
                <ArrowBackIosNew />
            </IconButton>
            <ContactMail />
            <Typography>
                Lobby Code
            </Typography>
        </Stack>
        <Divider />
        <List>

        </List>
      </Box>
    )
  }
  
  export default LobbyPage
  