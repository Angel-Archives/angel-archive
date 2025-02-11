// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#90caf9',
    },
    secondary: {
      main: '#dc004e', 
      light:'#f48fb1',
    },
    otherColor: {
      main: "#999"
    }
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;
