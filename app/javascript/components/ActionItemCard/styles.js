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
    paddingLeft: '30px',
    paddingRight: '30px',
  },
  cardStyle: {
    width: '95%',
    height: '150px',
    padding: 0,
    boxShadow: '0px 0px 0px 0px',
    borderBottom: `.75px solid ${theme.palette.common.lightGrey}`,
  },
});
export default styles;
