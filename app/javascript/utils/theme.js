import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    common: {
      blue: '#187be5',
      lighterBlue: '#DCF0F2',
      indigo: '#5870EB',
      lightBlue: 'rgba(210, 220, 225, 0.63)',
      purpleSecondary: '#DEE2FB',
      darkBlue: '#28303B',
      darkestBlue: '#29313C',
      white: '#FFFFFF',
      grey: '#d2dce1',
      lightGrey: '#C4C4C4',
      lightestGrey: '#F4F4F4',
      searchBox: 'rgba(210, 220, 225, 0.47)',
      highlightBlue: 'rgba(0, 159, 173, 0.17)',
      backgroundBlue: '#d2dce1',
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
    lighterButton: {
      r0: '#DEE2FB',
      r1: '#FFEAE8',
      r2: '#DCF0F2',
      studio: '#FFF7DD',
    },
    darkerButton: {
      r0: '#5870EB',
      r1: '#009FAD',
      r2: '#EB6658',
      studio: '#F2C94C',
    },
  },
});

export default theme;
