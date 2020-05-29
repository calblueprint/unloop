import theme from 'utils/theme';

export const styles = () => ({
  boundaryBox: {
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    minWidth: '400px',
    height: '460px',
  },

  categoryItem: {
    width: 'calc(100% - 16px)',
    margin: '8px',
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
    height: '210px',
    top: 0,
  },

  selectAll: {
    width: 'calc(100% - 16px)',
    margin: '8px',
  },
});

export default styles;
