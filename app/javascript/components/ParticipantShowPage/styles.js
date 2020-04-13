/*
 * ParticipantShowPage Styles
 *
 * This contains all the styles for the ParticipantShowPage container.
 */

const styles = theme => ({
  leftHalf: {
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 40,
  },
  rightHalf: {
    paddingTop: 40,
    paddingLeft: 28,
    marginRight: 0,
    backgroundColor: theme.palette.common.lightBlue,
  },
  navBar: {
    maxHeight: '100%',
    paddingTop: 40,
    backgroundColor: theme.palette.common.black,
  },
  navBarSignOut: {
    color: theme.palette.common.white,
  },
  navBarItem: {
    color: theme.palette.common.white,
  },
  avatarStyle: {
    width: 60,
    height: 60,
    backgroundColor: ({ status }) => {
      switch (status.toUpperCase()) {
        case 'R0':
          return theme.palette.common.r0;
        case 'R1':
          return theme.palette.common.r1;
        case 'R2':
          return theme.palette.common.r2;
        default:
          console.error('Participant has no status');
          return theme.palette.common.black;
      }
    },
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
