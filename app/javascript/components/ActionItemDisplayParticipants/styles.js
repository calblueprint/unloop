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
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    border: 1,
    width: '400px',
    height: '460px',
    paddingTop: '30px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '10px',
    overflowY: 'scroll',
  },

  displayScroll: {
    minHeight: '220px',
    height: '65vh',
    left: 0,
    top: 0,
    direction: 'rtl',
  },
});

export default styles;
