import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ad1457',
    },
    secondary: {
      main: '#f2e7fe',
    },
  },
  typography: {
    fontFamily: '"VT323", "Roboto"',
    fontSize: 24,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            backgroundColor: '#595959',
          },
        },
      },
    },
    MuiStack: {
      styleOverrides: {
        root: {
          fill: 'currentcolor',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          fill: 'currentcolor',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: 'inherit',
        },
      },
    },
  },
});

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '24rem',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  px: 3,
  pb: 3,
  pt: 2,
  textAlign: 'center',
};

export const listItemStylePrimary = {
  bgcolor: '#f2e7fe',
  color: '#ad1457',
  fill: '#ad1457',
};

export const listItemStyleSecondary = {
  bgcolor: '#ad1457',
  color: '#f2e7fe',
  fill: '#f2e7fe',
};
