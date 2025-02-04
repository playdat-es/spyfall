import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ad1457'
    },
    secondary: {
      main: '#f2e7fe'
    }
  },
  typography: {
    fontFamily: '"VT323", "Roboto"',
    fontSize: 24
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#595959'
          }
        }
      }
    }
  }
});

export const lobbyCodeModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  p: 4,
  textAlign: 'center'
};
