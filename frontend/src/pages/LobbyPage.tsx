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
    // Determine if user is creator (DEBUG VALUE FOR NOW)
    const isUserCreator = true
    
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
            <PlayerListItem playerName={creator.name} isCreator={isUserCreator} canEdit={true} canKick={false} />
            {users.map((user) => <PlayerListItem playerName={user.name} isCreator={false} canEdit={false} canKick={isUserCreator} />)}
        </List>
      </Box>
    )
  }
  
  export default LobbyPage
  