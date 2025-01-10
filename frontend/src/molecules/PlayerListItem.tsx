import { IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { Close, Edit, Face, FaceRetouchingNatural } from "@mui/icons-material"

interface PlayerListItemProps {
    playerName: string;
    isCreator: boolean;
    canEdit: boolean;
    canKick: boolean;
}

function PlayerListItem({ playerName, isCreator, canEdit, canKick }: PlayerListItemProps) {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end">
                    {canEdit ?
                        <Edit />
                    : canKick &&
                        <Close />
                    }
                </IconButton>
            }
        >
            <ListItemIcon>
                {isCreator
                    ? <FaceRetouchingNatural />
                    : <Face />
                }
            </ListItemIcon>
            <ListItemText primary={playerName} />
        </ListItem>
    )
}

export default PlayerListItem
  