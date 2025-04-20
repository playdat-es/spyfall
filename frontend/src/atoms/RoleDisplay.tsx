import { Stack, Tooltip, Typography } from '@mui/material';
import { Role } from '../utils/models.ts';

interface RoleProps {
  role?: Role;
}

function RoleDisplay({ role }: RoleProps) {
  return (
    <Stack height="52px">
      <Tooltip title={role?.description ?? ''} arrow>
        <Typography
          sx={{
            height: '100%',
            py: 1,
            color: 'primary.main',
            bgcolor: 'secondary.main',
            fontSize: 'min(calc(1rem + 1.5vw), 27px)',
            alignContent: 'center',
            borderRadius: '5px 0 0 5px',
            lineHeight: 0.9,
          }}
        >
          {role?.name ?? ''}
        </Typography>
      </Tooltip>
    </Stack>
  );
}

export default RoleDisplay;
