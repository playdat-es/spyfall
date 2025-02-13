import { Box, Typography } from '@mui/material';

interface RoleProps {
  role: string;
}

function RoleDisplay({ role }: RoleProps) {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography sx={{ py: 1, color: '#AD1457', bgcolor: '#F2E7FE' }}>{role}</Typography>
    </Box>
  );
}

export default RoleDisplay;
