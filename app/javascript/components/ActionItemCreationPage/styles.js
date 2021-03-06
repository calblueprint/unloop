const styles = theme => ({
  pageStyle: {
    minHeight: '100vh',
    maxWidth: '100%',
    margin: '0px',
    backgroundColor: theme.palette.common.white,
    padding: '8px 4%',
  },
  sideComponentStyle: {
    width: '50%',
    maxWidth: '480px',
    height: '80%',
    padding: '8px',
  },
  headerStyle: {
    // paddingLeft: '6%',
    '& div': {
      padding: '8px',
    },
  },
  snackbarStyle: {
    backgroundColor: 'red',
  },
  mainBackgroundStyle: {
    backgroundColor: theme.palette.common.lightestGrey,
    padding: '2%',
    minWidth: '600px',
    maxWidth: '1200px',
    maxHeight: '80vw',
    borderRadius: theme.shape.borderRadius,
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
  underlineStyle: {
    color: theme.palette.common.indigo,
    fontSize: '16px',
    lineHeight: '19px',
  },
  topLeftTextStyle: {
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '28px',
    marginBottom: '10px',
    color: theme.palette.common.indigo,
  },
  borderStyle: {
    border: `2px solid ${theme.palette.common.indigo}`,
    borderRadius: '5px 5px 0px 0px',
    align: 'left',
    width: '45%',
    margin: '0px 0px',
  },
});

export default styles;
