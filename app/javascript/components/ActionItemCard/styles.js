const styles = theme => ({
  titleStyle: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
  },
  iconStyle: {
    backgroundColor: theme.palette.common.lighterBlue,
    margin: '0px 10px',
    boxShadow: 'None',
  },
  categoryButtonStyle: {
    fontSize: '10px',
    width: '60px',
    textAlign: 'center',
  },
  cardStyle: {
    width: '100%',
    height: '140px',
    padding: '8px',
    margin: '10px 0px',
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
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
