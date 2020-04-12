export const styles = () => ({
  participant: {
    marginTop: '12px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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

  displayScroll: {
    marginTop: '35px',
    overflowY: 'scroll',
    left: 0,
    height: '65vh',
    top: 0,
    direction: 'rtl',
  },
});

export default styles;
