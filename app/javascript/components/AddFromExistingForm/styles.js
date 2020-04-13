const styles = theme => ({
  categoryButtonStyle: {
    fontSize: '10px',
    textAlign: 'center',
    width: 60,
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  formStyle: {
    height: '100%',
    width: '100%',
    width: '50vw',
    minWidth: '475px',
    maxWidth: '590px',
    height: '80vh',
    minHeight: '650px',
  },
  iconStyle: {
    boxShadow: 'None',
    margin: '0px, 5px',
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
