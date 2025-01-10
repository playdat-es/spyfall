import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { ArrowBackIosNew, ContactMail } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
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
  uuid: 'ABCDEF',
  creator: user1,
  users: [user1, user2, user3, user4],
}

function LobbyPage() {
  const navigate = useNavigate()
  // Fetch players in lobby here
  const {creator, users} = lobbyData
  // Get user (DEBUG VALUE FOR NOW)
  const user = user1
  // Determine if user is creator (DEBUG VALUE FOR NOW)
  const isUserCreator = user == creator
    
  return (
    <Box>
      <List>
          <ListItem divider >
              <IconButton edge="start" aria-label="back" onClick={() => navigate("/")}>
                  <ArrowBackIosNew />
              </IconButton>
              <ListItemIcon>
                  <ContactMail />
              </ListItemIcon>
              <ListItemText primary={lobbyData.uuid} />
          </ListItem>
          <PlayerListItem playerName={creator.name} isCreator={true} canEdit={isUserCreator} canKick={false} />
          {users.map((player) => player != creator && <PlayerListItem playerName={player.name} isCreator={false} canEdit={player == user} canKick={isUserCreator} />)}
      </List>
    </Box>
  )
}
  
export default LobbyPage
  