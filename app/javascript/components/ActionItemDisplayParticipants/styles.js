export const styles = theme => ({
  participant: {
    marginTop: '12px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  boxProps: {
    backgroundColor: theme.palette.common.indigo,
    width: '15rem',
    height: '0.4rem',
    borderRadius: '5px 5px 0px 0px',
    marginTop: '2%',
  },

  boundaryBox: {
    borderColor: theme.palette.common.white,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    border: 1,
    width: '400px',
    minHeight: '470px',
    paddingTop: '30px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '10px',
  },

  displayScroll: {
    minHeight: '220px',
    height: '65vh',
    overflowY: 'scroll',
    left: 0,
    top: 0,
    direction: 'rtl',
  },
});

export default styles;
