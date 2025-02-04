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
    },
    MuiModal: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30rem',
          height: '15rem',
          backgroundColor: 'rgb(59 59 59 / 95%)',
          borderRadius: '10px',
          padding: '1rem',
          textAlign: 'center'
        }
      }
    }
  }
});

export default theme;
