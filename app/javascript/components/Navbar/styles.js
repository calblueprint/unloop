/*
 * Navbar Styles
 *
 * This contains all the styles for the Navbar container.
 */

const styles = theme => ({
  navBar: {
    height: '100vh',
    paddingTop: 40,
    backgroundColor: theme.palette.common.darkestBlue,
    position: 'fixed',
    minWidth: 60,
  },
  navBarItem: {
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  unloopLogo: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    overflowX: 'hidden',
  },
  navText: {
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '16px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: theme.palette.common.white,
  },
});

export default styles;
