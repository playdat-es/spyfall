import { Stack, Tooltip, Typography } from '@mui/material';
import { Location } from '../utils/models.ts';

interface LocationProps {
  location?: Location;
}

function LocationDisplay({ location }: LocationProps) {
  return (
    <Stack height="52px">
      <Tooltip title={location?.description ?? ''} arrow>
        <Typography
          sx={{
            height: '100%',
            py: 1,
            color: 'secondary.main',
            bgcolor: 'primary.main',
            fontSize: 'min(calc(1rem + 1.5vw), 27px)',
            alignContent: 'center',
            borderRadius: '0 5px 5px 0',
            lineHeight: 0.9,
          }}
        >
          {location?.name ?? ''}
        </Typography>
      </Tooltip>
    </Stack>
  );
}

export default LocationDisplay;
