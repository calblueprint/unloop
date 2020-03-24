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
  },
  drawer: {
    width: 100,
    marginRight: 10,
  },
  navBarItem: {
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  unloopLogo: {
    paddingLeft: '10px',
    paddingBottom: '10px',
    width: '100%',
    objectFit: 'contain',
    overflowX: 'hidden',
    backgroundColor: '#29313C',
  },
});

export default styles;
