/*
 * ParticipantShowPage Styles
 *
 * This contains all the styles for the ParticipantShowPage container.
 */

export const styles = theme => ({
  leftHalf: {
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 40,
  },
  rightHalf: {
    paddingTop: 40,
    paddingLeft: 28,
    backgroundColor: theme.palette.common.lightBlue,
  },
  navBar: {
    maxHeight: '100%',
    paddingTop: 40,
    backgroundColor: theme.palette.common.black,
  },
  navBarSignOut: {
    paddingLeft: 28,
    paddingRight: 28,
    color: theme.palette.common.white,
  },
  navBarItem: {
    paddingLeft: 40,
    paddingRight: 40,
    color: theme.palette.common.white,
  },
  avatarStyle: {
    width: 60,
    height: 60,
    backgroundColor: theme.palette.secondary.main,
  },
  unloopLogo: {
    width: 'auto',
    height: '100%',
    objectFit: 'contain',
    backgroundColor: theme.palette.common.black,
    marginBottom: 0,
    paddingBottom: 0,
  },
});

export default styles;
