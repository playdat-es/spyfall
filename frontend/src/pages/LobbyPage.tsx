import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { ArrowBackIosNew, ContactMail } from "@mui/icons-material"
import PlayerListItem from "../molecules/PlayerListItem"

function LobbyPage() {
    // Fetch players in lobby here
    // DUMMY DATA
    const leader = 'Someone'
    const players = ['Noby', 'Stephen', 'James', 'Amy']
  
    return (
      <Box>
        <List>
            <ListItem divider >
                <IconButton edge="start" aria-label="back">
                    <ArrowBackIosNew />
                </IconButton>
                <ListItemIcon>
                    <ContactMail />
                </ListItemIcon>
                <ListItemText primary="Lobby Number" />
            </ListItem>
            <PlayerListItem playerName={leader} isLeader={true} canEdit={true} />
            {players.map((player) => <PlayerListItem playerName={player} isLeader={true} canEdit={false} />)}
        </List>
      </Box>
    )
  }
  
  export default LobbyPage
  