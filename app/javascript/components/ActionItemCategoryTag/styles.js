const styles = theme => ({
  categoryButtonStyle: {
    fontSize: '10px',
    textAlign: 'center',
    width: 60,
    color: ({ selected }) =>
      selected ? theme.palette.common.lighterBlue : theme.palette.primary.main,
  },
  iconStyle: {
    boxShadow: 'None',
    backgroundColor: ({ selected }) =>
      selected ? theme.palette.primary.main : theme.palette.common.lighterBlue,
    '&:hover': {
      backgroundColor: ({ selected }) =>
        selected
          ? theme.palette.primary.main
          : theme.palette.common.lighterBlue,
    },
  },
});

export default styles;
