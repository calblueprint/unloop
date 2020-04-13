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
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  cardStyle: {
    width: '95%',
    height: '150px',
    padding: 0,
    margin: '0px 15px',
    boxShadow: '0px 0px 0px 0px',
    borderBottom: ({ lastEntry }) =>
      lastEntry ? '0px' : `.75px solid ${theme.palette.common.lightGrey}`,
  },
  descriptionStyle: {
    textOverflow: 'ellipsis', 
    overflow: 'hidden', 
    maxHeight: '75px', 
    marginBottom: '20px'
  },
  buttonStyle: {
    color: theme.palette.common.r0,
  }
});
export default styles;
