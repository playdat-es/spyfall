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
                <IconButton edge="end">
                    {canEdit ?
                        <Edit />
                    : isLeader &&
                        <Close />
                    }
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
  