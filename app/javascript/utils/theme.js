import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    common: {
      blue: '#187be5',
      lightBlue: 'rgba(210, 220, 225, 0.63)',
      darkBlue: '#28303B',
      black: '#29313C',
      white: '#FFFFFF',
      grey: '#d2dce1',
      lightGrey: '#C4C4C4',
      lightestGrey: '#F4F4F4',
      r0: '#009FAD',
      r1: '#5870EB',
      r2: '#DF6C8E',
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
