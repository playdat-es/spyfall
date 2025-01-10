import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { ArrowBackIosNew, ContactMail } from "@mui/icons-material"
import PlayerListItem from "../molecules/PlayerListItem"

// DUMMY DATA
const user1 = {
  name: 'Noby'
}
const user2 = {
  name: 'Stephen'
}
const user3 = {
  name: 'James'
}
const user4 = {
  name: 'Amy'
}
const lobbyData = {
  creator: user2,
  users: [user1, user2, user3, user4],
}

function LobbyPage() {
    // Fetch players in lobby here
    const {creator, users} = lobbyData
    
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
            <PlayerListItem playerName={creator.name} isLeader={true} canEdit={true} />
            {users.map((user) => <PlayerListItem playerName={user.name} isLeader={true} canEdit={false} />)}
        </List>
      </Box>
    )
  }
  
  export default LobbyPage
  