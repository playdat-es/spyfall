import { Alert, Box, Button, Slide, Snackbar, Typography } from '@mui/material';
import { ContentCopy, TaskAlt } from '@mui/icons-material';
import { useState } from 'react';

interface LobbyCodeDisplayProps {
  lobbyId?: string;
}

function LobbyCodeDisplay({ lobbyId }: LobbyCodeDisplayProps) {
  const [showCopied, setShowCopied] = useState(false);

  const onCopyLobbyCode = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowCopied(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        variant="text"
        endIcon={<ContentCopy />}
        onClick={onCopyLobbyCode}
        sx={{ py: 0, px: 2, userSelect: 'text' }}
      >
        <Typography variant="h6">Code: {lobbyId}</Typography>
      </Button>
      <Snackbar
        open={showCopied}
        onClose={() => setShowCopied(false)}
        autoHideDuration={2000}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" icon={<TaskAlt />}>
          <Typography variant="body2">Invite link copied!</Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LobbyCodeDisplay;
