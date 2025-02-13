import { Box, Typography } from '@mui/material';

interface LocationProps {
  location: string;
}

function LocationDisplay({ location }: LocationProps) {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography sx={{ py: 1, color: '#F2E7FE', bgcolor: '#AD1457' }}>{location}</Typography>
    </Box>
  );
}

export default LocationDisplay;
