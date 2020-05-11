const styles = theme => ({
  titleStyle: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
  },
  iconStyle: {
    backgroundColor: theme.palette.common.lighterBlue,
    margin: '0px 10px',
    boxShadow: 'None',
    width: '80px', // Not too flexible for really long categories, but is good enough for up to 10-letter words
    height: '30px',
    borderRadius: '17px',
    textAlign: 'center',
    paddingTop: '7.5px', // This was really annoying to middle-align the text
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
});
export default styles;
