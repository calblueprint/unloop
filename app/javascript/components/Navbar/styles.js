/*
 * Navbar Styles
 *
 * This contains all the styles for the Navbar container.
 */

export const styles = theme => ({
  navBar: {
    height: '100vh',
    paddingTop: 40,
    backgroundColor: theme.palette.common.black,
    position: 'fixed',
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
    paddingLeft: '10px',
    paddingBottom: '10px',
    width: '100%',
    objectFit: 'contain',
    overflowX: 'hidden',
    backgroundColor: theme.palette.common.black,
  },
});

export default styles;
