const styles = theme => ({
  categoryButtonStyle: {
    fontSize: '10px',
    textAlign: 'center',
    width: 60,
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  formStyle: {
    minWidth: '475px',
    maxWidth: '590px',
    width: '50vw',
    height: '80vh',
    minHeight: '650px',
  },
  iconStyle: {
    boxShadow: 'None',
  },
  searchBar: {
    width: '100%',
    borderStyle: 'solid',
    backgroundColor: theme.palette.common.searchBox,
  },
  noActionItemsDisplay: {
    width: '50%',
    height: '50%',
    display: 'block',
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
});

export default styles;
