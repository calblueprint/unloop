const styles = theme => ({
    root: {
      margin: 24,
      borderRadius: 18,
    },
    cells: {
        padding: 16
    },
    borderTop: {
        border: '1px solid #bdbdbd',
    },
    clickable: {
      cursor: 'pointer',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  });

export default styles