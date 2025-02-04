import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
    fontFamily: '"VT323", "Roboto"'
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

export default theme;
