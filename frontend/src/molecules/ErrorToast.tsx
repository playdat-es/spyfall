import { Alert, Slide, Snackbar, Typography } from '@mui/material';
import { Error } from '@mui/icons-material';

interface ErrorToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

function ErrorToast({ open, onClose, message }: ErrorToastProps) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="error" variant="filled" icon={<Error fontSize="small" />}>
        <Typography variant="body2">{message}</Typography>
      </Alert>
    </Snackbar>
  );
}

export default ErrorToast;
