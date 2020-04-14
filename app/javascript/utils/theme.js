import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    common: {
      blue: '#187be5',
      lightBlue: 'rgba(210, 220, 225, 0.63)',
      ligterBlue: '#DCF0F2',
      black: '#29313C',
      white: '#FFFFFF',
    },
    primary: {
      light: '#009FAD',
      main: '#009FAD',
      dark: '#009FAD',
    },
    secondary: {
      light: '#EB6658',
      main: '#EB6658',
      dark: '#EB6658',
    },
  },
});

export default theme;
