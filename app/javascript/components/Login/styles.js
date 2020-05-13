import theme from 'utils/theme';

export const styles = () => ({
  body: {
    margin: 0,
  },

  loginScreen: {
    textAlign: 'center',
    display: 'flex',
    paddingLeft: '20vw',
  },

  background: {
    background: theme.palette.common.darkestBlue,
    margin: -10,
    padding: -10,
  },
  title: {
    color: 'rgb(43, 43, 43)',
    marginBottom: '5vh',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },

  loginContainer: {
    background: theme.palette.common.darkestBlue,
    margin: 0,
    display: 'flex',
    alignContent: 'center',
    paddingTop: '20vh',
    paddingBottom: '20vh',
  },

  login: {
    height: '60vh',
    borderRadius: '0px 15px 15px 0px',
    textAlign: 'left',
    backgroundColor: 'rgba(0, 159, 173, 1)',
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },

  buttonStyling: {
    margin: 0,
    padding: 0,
    background: 'rgba(0, 159, 173, 1)',
  },

  unloopImage: {
    padding: 0,
    margin: 0,
    width: '35vw',
    height: '60vh',
    objectFit: 'cover',
    borderRadius: '15px 0px 0px 15px',
  },

  loginBox: {
    display: 'inline-block',
    paddingTop: '20vh',
    paddingBottom: '10vh',
    paddingRight: '5vw',
    paddingLeft: '5vw',
  },

  signInButton: {
    textAlign: 'center',
    paddingTop: '5vh',
  },
});

export default styles;
