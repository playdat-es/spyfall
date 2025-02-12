import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Close, Edit, Face, FaceRetouchingNatural } from '@mui/icons-material';
import { useState } from 'react';
import { Player } from '../utils/models.ts';
import { modalStyle, listItemStylePrimary } from '../theme.ts';
import { PLAYER_NAME_LENGTH } from '../utils/utils.ts';

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
      <ListItemText primary={`${player.name} ${dedupeString}`} />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={modalStyle}>
          <Stack spacing={1}>
            <Typography variant="h5" component="label">
              Edit Name
            </Typography>
            <TextField
              defaultValue={player.name}
              slotProps={{ htmlInput: { maxLength: PLAYER_NAME_LENGTH } }}
              autoComplete="off"
              onChange={(text) => setNewName(text.target.value.trim())}
            />
            <Stack direction="row" spacing={1} justifyContent="right">
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={onRename}
                disabled={newName === player.name}
                sx={{ width: 120 }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </ListItem>
  );
}

export default PlayerListItem;
