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
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    height: '444px',
    padding: '8px',
    width: '100%',
    minWidth: '400px',
    overflowY: 'scroll',
  },

  displayScroll: {
    minHeight: '220px',
    height: '460px',
    left: 0,
    top: 0,
    direction: 'rtl',
  },
});

export default styles;
