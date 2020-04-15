const styles = theme => ({
  '@global': {
    body: {
      margin: '0px',
    },
  },
  mainBackgroundStyle: {
    backgroundColor: theme.palette.common.lightestGrey,
    padding: '2%',
    minWidth: '950px',
  },
  iconStyle: {
    backgroundColor: theme.palette.common.r0,
    '&:hover': {
        backgroundColor: theme.palette.common.r0,
      },
    marginTop: '27px',
    boxShadow: 'None',
  },
  categoryButtonStyle: {
    textAlign: 'center',
    color: theme.palette.common.white,
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  underlineStyle: {
      color: theme.palette.common.r0,
      fontSize: '16px', 
      lineHeight: '19px', 
  },
  topLeftTextStyle: {
    fontWeight: 500, 
    fontSize: '24px', 
    lineHeight: '28px', 
    marginBottom: '10px',
    color: theme.palette.common.r0
  },
  borderStyle: {
      border: `2px solid ${theme.palette.common.r0}`,
      borderRadius: '5px 5px 0px 0px',
      align: 'left',
      width: '45%',
      margin: '0px 0px'
  }
});

export default styles;
