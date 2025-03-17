import { AppBar, Box, Grid2, Stack, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { AssignmentInd, Place } from '@mui/icons-material';
import { Player } from '../utils/models.ts';
import StrikeableButton from '../atoms/StrikeableButton.tsx';

interface NotesTabsProps {
  players: Player[];
  locations: string[];
  isSpy: boolean;
}

interface LocationsTabProps {
  locations: string[];
  selected: boolean;
}

interface PlayersTabProps {
  players: Player[];
  selected: boolean;
}

function LocationsTab({ locations, selected }: LocationsTabProps) {
  return (
    <Box hidden={!selected}>
      <Grid2 container rowSpacing={0}>
        {locations.map((location) => (
          <Grid2 size={{ xs: 6, sm: 4 }} key={location}>
            <StrikeableButton text={location} />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}

function PlayersTab({ players, selected }: PlayersTabProps) {
  return (
    <Box hidden={!selected}>
      <Grid2 container>
        {players.map((player) => {
          return (
            <Grid2 size={6} key={player.name}>
              <StrikeableButton text={player.name} />
            </Grid2>
          );
        })}
      </Grid2>
    </Box>
  );
}

function NotesTabs({ players, locations, isSpy }: NotesTabsProps) {
  const [tabIndex, setTabIndex] = useState(isSpy ? 0 : 1);
  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Stack pt={1}>
      <AppBar position="static" sx={{ borderRadius: '5px 5px 0 0' }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ height: '50px' }}
        >
          <Tab
            label="Locations"
            icon={<Place sx={{ fontSize: 20 }} />}
            iconPosition="start"
            value={0}
            sx={{ p: 0, minHeight: '50px', height: '50px', textTransform: 'none' }}
          />
          <Tab
            label="Players"
            icon={<AssignmentInd sx={{ fontSize: 20 }} />}
            iconPosition="start"
            value={1}
            sx={{ p: 0, minHeight: '50px', height: '50px', textTransform: 'none' }}
          />
        </Tabs>
      </AppBar>
      <Box height="55vh" overflow="auto">
        <LocationsTab locations={locations} selected={tabIndex === 0} />
        <PlayersTab players={players} selected={tabIndex === 1} />
      </Box>
    </Stack>
  );
}

export default NotesTabs;
