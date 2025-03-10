import { IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Close, Edit, Face, FaceRetouchingNatural } from '@mui/icons-material';
import { useState } from 'react';
import { Player } from '../utils/models.ts';
import { listItemStylePrimary } from '../theme.ts';
import PlayerRenameDialog from './PlayerRenameDialog.tsx';

interface PlayerListItemProps {
  player: Player;
  creator: string;
  playerRenameEvent: (newName: string) => void;
  kickPlayerEvent: (playerId: string) => void;
}

function PlayerListItem({
  player,
  playerRenameEvent,
  kickPlayerEvent,
  creator,
}: PlayerListItemProps) {
  const [showRenameModal, setShowRenameModal] = useState(false);

  const canEdit = player.id === localStorage.getItem('playerId');
  const canKick = creator === localStorage.getItem('playerId') && !canEdit;
  const dedupeString = (player.dedupe ?? 0 > 0) ? `(${[player.dedupe]})` : '';

  const onKick = () => {
    kickPlayerEvent(player.id);
  };

  return (
    <ListItem
      secondaryAction={
        (canEdit || canKick) && (
          <>
            {canEdit && (
              <IconButton edge="end" onClick={() => setShowRenameModal(true)}>
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
      <PlayerRenameDialog
        open={showRenameModal}
        onClose={() => setShowRenameModal(false)}
        playerRenameEvent={playerRenameEvent}
        currentName={player.name}
      />
    </ListItem>
  );
}

export default PlayerListItem;
