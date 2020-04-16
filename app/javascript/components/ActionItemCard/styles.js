const styles = theme => ({
  iconStyle: {
    backgroundColor: theme.palette.common.lighterBlue,
    margin: '0px 10px',
    boxShadow: 'None',
  },
  categoryButtonStyle: {
    fontSize: '10px',
    width: '60px',
    textAlign: 'center',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  cardStyle: {
    width: '95%',
    height: '140px',
    padding: '0px',
    margin: '0px 15px',
    boxShadow: '0px 0px 0px 0px',
    borderBottom: ({ lastEntry }) =>
      lastEntry ? '0px' : `.75px solid ${theme.palette.common.lightGrey}`,
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
