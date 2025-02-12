import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
} from '@mui/material';
import { Close, Edit, Face, FaceRetouchingNatural } from '@mui/icons-material';
import { useState } from 'react';
import { Player } from '../utils/models.ts';
import { modalStyle, listItemStylePrimary } from '../theme.ts';

interface PlayerListItemProps {
  player: Player;
  rename: (newName: string) => void;
  kick: (playerId: string) => void;
  creator: string;
}

function PlayerListItem({ player, rename, kick, creator }: PlayerListItemProps) {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState(player.name);

  const canEdit = player.id === localStorage.getItem('playerId');
  const canKick = creator === localStorage.getItem('playerId') && !canEdit;
  const dedupeString = (player.dedupe ?? 0 > 0) ? `(${[player.dedupe]})` : '';

  const onRename = () => {
    rename(newName);
    setShowModal(false);
  };

  const onKick = () => {
    kick(player.id);
  };

  return (
    <ListItem
      secondaryAction={
        (canEdit || canKick) && (
          <>
            {canEdit && (
              <IconButton edge="end" onClick={() => setShowModal(true)}>
                <Edit />
              </IconButton>
            )}
            {canKick && (
              <IconButton edge="end" onClick={onKick}>
                <Close />
              </IconButton>
            )}
          </>
        )
      }
      sx={canEdit ? listItemStylePrimary : undefined}
    >
      <ListItemIcon>{player.id === creator ? <FaceRetouchingNatural /> : <Face />}</ListItemIcon>
      <ListItemText primary={`${player.name} ${dedupeString}`} secondary={canEdit ? '(you)' : ''} />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={modalStyle}>
          <TextField
            label="Change name"
            defaultValue={player.name}
            slotProps={{ htmlInput: { maxLength: 16 } }}
            autoComplete="off"
            fullWidth
            onChange={(text) => setNewName(text.target.value.trim())}
          />
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={onRename} disabled={newName === player.name}>
            Submit
          </Button>
        </Box>
      </Modal>
    </ListItem>
  );
}

export default PlayerListItem;
