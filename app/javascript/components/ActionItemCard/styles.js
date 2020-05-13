const styles = theme => ({
  titleStyle: {
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
    height: '140px',
    padding: '8px',
    margin: '10px 0px',
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
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
  },
  buttonStyle: {
    color: theme.palette.common.r0,
  },
  iconStyle: {
    color: theme.palette.common.r0,
    // marginLeft: '400%', // Push the chevron button all the way to the right
    // height: 30,
    minWidth: '13px',
    minHeight: '23px',
  },
});
export default styles;
