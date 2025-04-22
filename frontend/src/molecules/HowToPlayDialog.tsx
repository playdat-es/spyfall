import { Dialog, DialogContent, DialogTitle, Stack, Typography, Box, Button } from '@mui/material';
import CloseDialogButton from '../atoms/CloseDialogButton.tsx';

interface HowToPlayDialogProps {
  open: boolean;
  onClose: () => void;
}

function HowToPlayDialog({ open, onClose }: HowToPlayDialogProps) {
  const LineBreak = () => <Box component="span" display="block" mb={1} />;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        How to Play
        <CloseDialogButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Typography variant="body2">
            Spyfall is a game of deduction and deception.
            <LineBreak />
            Each round, a location is chosen and revealed to everyone except the spy.
            <LineBreak />
            The spy&apos;s goal is to guess the location while everyone else tries to identify the
            spy.
          </Typography>
          <LineBreak />
          <Typography variant="subtitle1">[Setup]</Typography>
          <Typography variant="body2">
            • Create a lobby and share the code with your friends
            <LineBreak />
            • The host can start the game with 3-8 players
            <LineBreak />• The spy and location will be chosen at random
          </Typography>
          <LineBreak />
          <Typography variant="subtitle1">[Gameplay]</Typography>
          <Typography variant="body2">
            • Players take turns asking each other questions
            <LineBreak />
            • The spy should try to blend in by being vague
            <LineBreak />• Other players should be specific but not too obvious
          </Typography>
          <LineBreak />
          <Typography variant="subtitle1">[Winning]</Typography>
          <Typography variant="body2">
            • The spy wins by correctly guessing the location
            <LineBreak />
            • Other players win by voting out the spy
            <LineBreak />• The game ends when time runs out or a vote is called
          </Typography>
          <LineBreak />
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default HowToPlayDialog;
