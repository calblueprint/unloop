const styles = theme => ({
  modalStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25%',
    height: 'auto',
    minWidth: '400px',
    minHeight: '335px',
    padding: '50px 0px',
  },
  iconStyle: {
    backgroundColor: theme.palette.common.indigo,
    '&:hover': {
      backgroundColor: theme.palette.common.indigo,
    },
    marginTop: '27px',
    boxShadow: 'None',
  },
  categoryButtonStyle: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
    width: '135px',
    color: theme.palette.common.white,
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21px',
  },
});

export default styles;
