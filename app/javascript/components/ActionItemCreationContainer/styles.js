const styles = theme => ({
  containerStyle: {
    minWidth: '400px',
    height: '90%',
  },
  selectedButton: {
    backgroundColor: theme.palette.common.purpleSecondary,
    color: theme.palette.common.r0,
    '&:hover': {
      backgroundColor: theme.palette.common.purpleSecondary,
    },
  },
  unselectedButton: {
    color: theme.palette.common.r0,
    '&:hover': {
      backgroundColor: theme.palette.common.lightestGrey,
    },
  },
});

export default styles;
