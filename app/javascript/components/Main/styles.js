const drawerWidth = 130;

const styles = () => ({
  body: {
    margin: 0,
  },
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#29313C',
    overflow: 'hidden',
  },
  // necessary for content to be below app bar
  content: {
    flexGrow: 1,
    backgroundColor: 'rgba(210, 220, 225, 0.63)',
    position: 'relative',
    left: drawerWidth,
    minHeight: '100vh',
    width: 'calc(100vw - 130px)',
  },
  navBarItem: {
    color: '#ffffff',
    paddingTop: 24,
  },
  blueprintLogo: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  unloopLogo: {
    width: '75%',
    objectFit: 'contain',
    // Needed to center logo because grid item not wrapping to size of image
    display: 'flex',
    position: 'relative',
    left: '10px',
  },
  navText: {
    paddingLeft: 4,
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '10px',
    textTransform: 'uppercase',
    color: '#ffffff',
  },
});

export default styles;
