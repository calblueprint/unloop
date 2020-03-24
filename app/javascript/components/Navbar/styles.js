/*
 * Navbar Styles
 *
 * This contains all the styles for the Navbar container.
 */

const styles = theme => ({
  navBar: {
    height: '100vh',
    paddingTop: 40,
    backgroundColor: '#29313C',
    position: 'fixed',
    minWidth: 60,
  },
  drawer: {
    width: 100,
    marginRight: 10,
  },
  navBarSignOut: {
    color: theme.palette.common.white,
  },
  navBarItem: {
    color: theme.palette.common.white,
  },
  unloopLogo: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    overflowX: 'hidden',
  },
});

export default styles;
