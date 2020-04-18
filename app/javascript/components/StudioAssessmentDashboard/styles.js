import { fade } from '@material-ui/core/styles';

const backgroundBlue = '#d2dce1';
const white = '#fff';

const styles = theme => ({
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  dashboard: {
    height: '100%',
    width: '100%',
    fontStyle: 'normal',
    backgroundColor: '#ffffff',

    '& thead': {
      '& th': {
        paddingBottom: 16,
      },
      borderBottom: '2px solid #eb6658',
    },
    '& h1': {
      marginLeft: 50,
      fontWeight: 550,
      fontSize: 36,
    },
  },
  '@global': {
    button: {
      cursor: 'pointer',
      border: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
    body: {
      margin: 0,
      maxWidth: 100,
      cursor: 'default',
      fontFamily: 'Roboto, sans-serif',
      fontStyle: 'normal',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 20,
      fontFamily: "'Roboto', sans-serif",
      fontStyle: 'normal',

      '& th, & td': {
        padding: '25px 3%',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
      },

      '& tbody': {
        '& tr:hover': {
          backgroundColor: '#f5f5f5',
        },
      },

      '& td': {
        '& > div': {
          fontSize: 18,
          fontWeight: 300,
          fontStyle: 'normal',
        },
      },
    },
  },
  tableContainer: {
    height: '100%',
    minHeight: '100vh',
    backgroundColor: backgroundBlue,
    padding: '20px 42px',
    '& > div': {
      backgroundColor: white,
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
      borderRadius: 20,
      padding: 30,
    },
  },
  searchBar: {
    height: 40,
    marginLeft: 30,
    borderRadius: 2,
    width: 260,
    border: '1px solid #bdbdbd',
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
