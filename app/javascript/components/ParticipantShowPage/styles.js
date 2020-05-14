/*
 * ParticipantShowPage Styles
 *
 * This contains all the styles for the ParticipantShowPage container.
 */

const styles = theme => ({
  leftHalf: {
    paddingTop: '5vh',
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 20,
    backgroundColor: theme.palette.common.white,
    width: '50%',
    height: 'max(100%, 100vh)',
  },
  rightHalf: {
    paddingLeft: 40,
    paddingTop: 20,
    width: '50%',
    height: 'max(100%, 100vh)',
  },
  avatarStyle: {
    width: 100,
    height: 30,
    borderRadius: 14,
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '25px',
    color: theme.palette.common.white,
    fontSize: '18px',
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
          return theme.palette.common.darkestBlue;
      }
    },
  },
});

export default styles;
