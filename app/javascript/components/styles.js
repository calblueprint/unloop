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
    marginTop: '20px',
  },

  entirePage: {
    height: '600px',
    width: '600px',
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

  participantBar: {
    width: '0.4rem',
    height: '2rem',
    marginRight: '7%',
    borderRadius: '16px',
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

  titleBar: {
    bgcolor: '#EB6658',
    borderColor: '#EB6658',
    style: { width: '0.2rem', height: '2rem' },
    marginRight: '7%',
  },

  selectAll: {
    marginLeft: '70%',
    marginTop: '20px',
    marginBottom: '30px',
  },

  participantSelect: {
    position: 'absolute',
    right: '0px',
    horizontalAlign: 'right',
    float: 'right',
  },

  participantObj: {
    display: 'flex',
    width: '70%',
    lineHeight: '30px',
    height: '30px',
  },
});

export default styles;
