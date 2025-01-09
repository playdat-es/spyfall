import { IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Close, Edit, Face, FaceRetouchingNatural } from "@mui/icons-material"

interface PlayerListItemProps {
    playerName: string;
    isLeader: boolean;
    canEdit: boolean;
}

function PlayerListItem({ playerName, isLeader, canEdit }: PlayerListItemProps) {
    return (
        <ListItem
            secondaryAction={
                canEdit ?
                    <IconButton edge="end" aria-label="edit">
                        <Edit />
                    </IconButton>
                : isLeader &&
                    <IconButton edge="end" aria-label="kick">
                        <Close />
                    </IconButton>
            }
        >
            <ListItemIcon>
                {isLeader
                    ? <FaceRetouchingNatural />
                    : <Face />
                }
            </ListItemIcon>
            <ListItemText primary={playerName} />
        </ListItem>
    )
}

export default PlayerListItem
  