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
      defaultProps: {
        fontSize: 'small',
      },
      styleOverrides: {
        root: {
          fill: 'inherit',
        },
      },
    },
  },
});

export const listItemStylePrimary = {
  bgcolor: '#f2e7fe',
  color: '#ad1457',
  fill: '#ad1457',
  borderRadius: '5px',
};
