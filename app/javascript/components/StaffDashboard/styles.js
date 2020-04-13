const styles = theme => ({
  dashboard: {
    height: '100%',
    width: '100%',
    fontStyle: 'normal',

    '& thead': {
      '& th': {
        paddingBottom: 16,
      },
      borderBottom: `2px solid ${theme.palette.secondary.main}`,
    },
    '& h1': {
      marginLeft: 50,
      fontWeight: 550,
      fontSize: 36,
    },
  },
  '@global': {
    button: {
      cursor: 'pointer',
      border: 'none',
      '&:focus': {
        outline: 'none',
      },
    },
    body: {
      margin: 0,
      maxWidth: 100,
      cursor: 'default',
      fontFamily: 'Roboto, sans-serif',
      fontStyle: 'normal',
    },
    html: {
      margin: 0,
      maxWidth: 100,
      cursor: 'default',
      fontFamily: 'Roboto, sans-serif',
      fontStyle: 'normal',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 20,
      fontFamily: "'Roboto', sans-serif",
      fontStyle: 'normal',

      '& th, & td': {
        padding: '25px 3%',
        textAlign: 'left',
        borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
      },

      '& tbody': {
        '& tr:hover': {
          backgroundColor: theme.palette.common.lightestGrey,
        },
      },

      '& td': {
        '& > div': {
          fontSize: 18,
          fontWeight: 300,
          fontStyle: 'normal',
        },
      },
    },
  },
  tableContainer: {
    height: '100%',
    minHeight: '100vh',
    backgroundColor: theme.palette.common.grey,
    padding: '20px 42px',
    '& > div': {
      backgroundColor: theme.palette.common.white,
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
      borderRadius: 20,
      padding: 30,
    },
  },
  content: {
    position: 'absolute',
    left: '8%',
    width: 'calc(92%)',
    display: 'inline-block',
  },
  searchBar: {
    height: 40,
    marginLeft: 30,
    borderRadius: 2,
    width: 260,
    border: `1px solid ${theme.palette.common.lightGrey}`,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
