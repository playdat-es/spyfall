import { AppBar, Box, Divider, Grid2, Tab, Tabs, Typography } from '@mui/material';
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
      <Grid2 container>
        {locations.map((location) => (
          <Grid2 size={4} key={location}>
            <StrikeableButton text={location} />
            <Divider />
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
              <Divider />
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
    <Box sx={{ pt: 1 }}>
      <Typography variant="h6">Notes</Typography>
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Locations" icon={<Place fontSize="small" />} iconPosition="start" value={0} />
          <Tab
            label="Players"
            icon={<AssignmentInd fontSize="small" />}
            iconPosition="start"
            value={1}
          />
        </Tabs>
      </AppBar>
      <Grid2 container>
        <Grid2 size={6}></Grid2>
      </Grid2>
      <Box sx={{ height: '40vh', overflowY: 'auto' }}>
        <LocationsTab locations={locations} selected={tabIndex === 0} />
        <PlayersTab players={players} selected={tabIndex === 1} />
      </Box>
    </Box>
  );
}

export default NotesTabs;
