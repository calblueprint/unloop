const styles = theme => ({
  categoryButtonStyle: {
    fontSize: '10px',
    textAlign: 'center',
    width: 60,
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  formStyle: {
    overflow: 'hidden',
    padding: '8px',
    minHeight: '300px',
    width: '100%',
    fontFamily: 'Roboto',
  },
  iconStyle: {
    boxShadow: 'None',
  },
  searchBar: {
    width: '100%',
    borderStyle: 'solid',
    padding: '0px',
    '& input': {
      padding: '5px 5px',
    },
    backgroundColor: theme.palette.common.searchBox,
  },
  listStyle: {
    overflow: 'auto',
    width: '100%',
    maxHeight: '100%',
    height: '30vh',
    minHeight: '240px',
    marginBottom: '20px',
  },
  checkboxTextStyle: {
    color: theme.palette.common.indigo,
    fontSize: '12px',
    margin: '5px',
  },
  checkboxStyle: {
    margin: '0px',
    paddingRight: '0px',
  },
});

export default styles;
