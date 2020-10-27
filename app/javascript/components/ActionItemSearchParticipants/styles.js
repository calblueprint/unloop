import theme from 'utils/theme';

export const styles = () => ({
  boundaryBox: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    minWidth: '400px',
    padding: '8px',
    height: '480px',
  },

  categoryItem: {
    width: 'calc(100% - 16px)',
    margin: '8px',
    fontFamily: 'Roboto',
  },

  statusButton: {
    borderRadius: '20px',
    height: '0.01px',
    width: '100px',
    brightness: '50%',
    marginRight: '10px',
  },

  searchIndividual: {
    width: 'calc(100% - 16px)',
    margin: '8px',
    fontFamily: 'Roboto',
  },

  searchBar: {
    width: 'calc(100% - 16px)',
    margin: '8px',
    backgroundColor: theme.palette.common.searchBox,
    borderRadius: theme.shape.borderRadius,
  },

  searchScroll: {
    width: 'calc(100% - 16px)',
    margin: '0px 8px',
    overflowY: 'scroll',
    left: 0,
    height: '224px',
    top: 0,
  },

  selectAll: {
    width: 'calc(100% - 16px)',
    margin: '8px',
  },
});

export default styles;
