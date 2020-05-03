import theme from 'utils/theme';

export const styles = () => ({
  statusButton: {
    borderRadius: '20px',
    height: '0.01px',
    width: '100px',
    brightness: '50%',
    marginRight: '10px',
    marginBottom: '10px',
    marginTop: '20px',
  },

  boxProps: {
    backgroundColor: theme.palette.common.indigo,
    width: '15rem',
    height: '0.4rem',
    borderRadius: '5px 5px 0px 0px',
    marginTop: '2%',
  },

  boundaryBox: {
    borderColor: theme.palette.common.white,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    border: 1,
    width: '90%',
    minWidth: '400px',
    height: '90%',
    minHeight: '300px',
    marginTop: '7px',
    marginBottom: '15px',
    paddingLeft: '30px',
    paddingTop: '20px',
    paddingRight: '20px',
  },

  searchIndividual: {
    marginTop: '20px',
  },

  searchBar: {
    marginBottom: '10px',
    backgroundColor: theme.palette.common.searchBox,
    width: '100%',
    borderRadius: '5px',
    marginTop: '5px',
  },

  searchScroll: {
    overflowY: 'scroll',
    left: 0,
    height: '210px',
    top: 0,
  },

  selectAll: {
    marginLeft: '70%',
    marginTop: '20px',
    marginBottom: '30px',
  },
});

export default styles;
