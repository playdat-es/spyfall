import { Box, Typography } from '@mui/material';

interface RoleLocationListItemProps {
  role: string;
  location: string;
}

function RoleLocationDisplay({ role, location }: RoleLocationListItemProps) {
  const isSpy = role == 'Spy';
  return (
    <Box>
      <Typography variant="h4" sx={{ my: 1 }}>
        Your Role
      </Typography>
      <Typography variant="h4" sx={{ py: 1, color: '#AD1457', bgcolor: '#F2E7FE' }}>
        {role}
      </Typography>
      <Typography variant="h4" sx={{ mt: 4, mb: 1 }}>
        Location
      </Typography>
      <Typography variant="h4" sx={{ py: 1, color: '#F2E7FE', bgcolor: '#AD1457' }}>
        {isSpy ? '???' : location}
      </Typography>
    </Box>
  );
}

export default RoleLocationDisplay;
