const styles = theme => ({
  containerStyle: {
    minWidth: '400px',
  },
  selectedButton: {
    backgroundColor: theme.palette.common.purpleSecondary,
    color: theme.palette.common.indigo,
    '&:hover': {
      backgroundColor: theme.palette.common.purpleSecondary,
    },
  },
  unselectedButton: {
    color: theme.palette.common.indigo,
    '&:hover': {
      backgroundColor: theme.palette.common.lightestGrey,
    },
  },
});

export default styles;
