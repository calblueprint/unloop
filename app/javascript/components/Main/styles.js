const drawerWidth = 130

const styles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#29313C",
    },
    // necessary for content to be below app bar
    content: {
      flexGrow: 1,
      backgroundColor: 'rgba(210, 220, 225, 0.63)',
      position: 'absolute',
      left: drawerWidth,
      height: '100vh',
      width: 'calc(100vw - 130px)'
    },
    navBar: {
      paddingTop: 40,
    },
    navBarItem: {
      color: '#ffffff',
    },
    unloopLogo: {
      width: '100%',
      height: 'auto',
      objectFit: 'contain',
      overflowX: 'hidden',
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
