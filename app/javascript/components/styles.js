/*
 * ActionItemModal Multiple Components
 *
 * Styling for these different components
 */

export const styles = () => ({
  statusButton: {
    borderRadius: '20px',
    height: '0.01px',
    width: '100px',
    brightness: '50%',
    marginRight: '10px',
    marginBottom: '10px',
    // backgroundColor: '#EB6658',
  },

  entirePage: {
    height: '600px',
    width: '600px',
  },

  circle: {
    height: '50px',
    width: '50px',
    backgroundColor: '#280096',
    borderRadius: '50%',
    display: 'inline-block',
  },

  lineBetweenCircles: {
    height: '5px',
    width: '50px',
    backgroundColor: '#280096',
    borderColor: '#280096',
    display: 'inline-block',
    // border: 1,
    // style: { width: '0.2rem', height: '2rem' },
  },

  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },

  displayScroll: {
    marginTop: '35px',
    overflowY: 'scroll',
    left: 0,
    height: '65vh',
    // right:,
    top: 0,
    direction: 'rtl',
  },

  searchScroll: {
    overflowY: 'scroll',
    left: 0,
    height: '40vh',
    // right:,
    top: 0,
  },

  searchIndividual: {
    marginTop: '20px',
  },

  categories: {
    // marginLeft: '20px',
    // marginRight: '20px',
    // marginTop: '20px',
  },

  searchBar: {
    marginBottom: '10px',
    backgroundColor: 'rgba(210, 220, 225, 0.47)',
    width: '100%',
    borderRadius: '5px',
    marginTop: '5px',
  },

  participant: {
    marginTop: '12px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    // alignContent: 'space-between',
    justifyContent: 'space-between',
    width: '100%',
  },

  colors: {
    r0: '#5870EB',
    r1: '#EB6658',
    r2: '#009FAD',
  },

  participantBar: {
    width: '0.4rem',
    height: '2rem',
    marginRight: '7%',
    borderRadius: '16px',
  },

  searchParticipants: {
    // backgroundColor: '#5870EB',
    // display: 'inline-flex',
    width: '45%',
    // left: '60%',
    height: '80%',
  },

  boxProps: {
    backgroundColor: '#5870EB',
    width: '15rem',
    height: '0.4rem',
    borderRadius: '5px 5px 0px 0px',
    marginTop: '2%',
  },

  boundaryBox: {
    borderColor: '#FFFFFF',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    border: 1,
    width: '100%',
    height: '80%',
    marginTop: '7px',
    marginBottom: '15px',
    paddingLeft: '30px',
    paddingTop: '20px',
    paddingRight: '20px',
  },

  displayParticipants: {
    width: '40%',
    height: '80%',
  },

  titleBar: {
    bgcolor: '#EB6658',
    borderColor: '#EB6658',
    // border: 1,
    style: { width: '0.2rem', height: '2rem' },
    marginRight: '7%',
  },
});

export default styles;
