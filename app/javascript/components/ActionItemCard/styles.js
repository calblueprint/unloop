const styles = theme => ({
  titleStyle: {
    paddingRight: '16px',
    maxWidth: '200px',
    textOverflow: 'ellipsis',
  },
  categoryButtonStyle: {
    fontSize: '10px',
    width: '60px',
    textAlign: 'center',
    margin: 'auto',
  },
  cardStyle: {
    width: '100%',
    minHeight: '140px',
    padding: '8px 8px 8px 16px',
    marginBottom: '10px',
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    borderBottom: ({ addBorderBottom }) =>
      addBorderBottom ? `.75px solid ${theme.palette.common.lightGrey}` : '0px',
  },
  disabledCardStyle: {
    width: '100%',
    minHeight: '140px',
    padding: '8px 8px 8px 16px',
    marginBottom: '10px',
    boxShadow: 'none',
    backgroundColor: '#f1f8e9',
    borderRadius: theme.shape.borderRadius,
    borderBottom: ({ addBorderBottom }) =>
      addBorderBottom ? `.75px solid ${theme.palette.common.lightGrey}` : '0px',
  },
  descriptionStyle: {
    textOverflow: 'ellipsis',
    fontSize: '14px',
    overflow: 'hidden',
    lineHeight: '1.5em',
    height: '4.5em',
    margin: '0px',
    marginBottom: '15px',
    maxWidth: 'calc(100% - 64px)',
  },
  buttonStyle: {
    color: theme.palette.common.r0,
  },
  iconStyle: {
    color: theme.palette.common.r0,
    minWidth: '13px',
    minHeight: '23px',
  },
});
export default styles;
