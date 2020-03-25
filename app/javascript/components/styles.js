/*
 * ActionItemModal Multiple Components
 *
 * Styling for these different components
 */

export const styles = theme => ({
  // participantBox: {
  //   marginTop: '0px',
  //   marginBottom: '0px',
  //   marginRight: '0px',
  //   marginLeft: '0px',
  // },

  statusButton: {
    borderRadius: '20px',
    height: '0.01px',
    width: '100px',
    // padding: '0 30px',
    marginRight: '10px',
    marginBottom: '10px',
  },

  searchBar: {
    marginBottom: '10px',
  },

  participant: {
    marginTop: '8px',
    // marginBottom: '0px',
    // marginRight: '0px',
    // marginLeft: '0px',
    // backgroundColor: '#5870EB',
    display: 'flex',
    alignItems: 'center',
  },

  searchParticipants: {
    // backgroundColor: '#5870EB',
    display: 'inline-block',
    width: '45%',
  },

  displayParticipants: {
    // backgroundColor: '#5870EB',
    display: 'inline-block',
    width: '45%',
  },

  titleBar: {
    bgcolor: '#EB6658',
    borderColor: '#EB6658',
    // border: 1,
    style: { width: '0.2rem', height: '2rem' },
    marginRight: '7%',
  },

  // titleBar: {
  //   bgcolor: '#5870EB',
  //   // borderRadius: '5px 5px 0px 0px',
  //   style: {
  //     width: '0.2rem',
  //     height: '2rem',
  //   },
  // },

  // END

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
    backgroundColor: '#EB6658',
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
