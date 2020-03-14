const backgroundBlue = '#d2dce1';
const white = '#fff';

const styles = () => ({
  dashboard: {
    height: '100%',
    width: '100%',
    fontStyle: 'normal',

    '& thead': {
      '& th': {
        paddingBottom: 16,
      },
      borderBottom: '2px solid #eb6658',
    },
    '& h1': {
      marginLeft: 50,
      fontWeight: 550,
      fontSize: 36,
    },
  },

  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: 20,
    fontFamily: "'Roboto', sans-serif",
    fontStyle: 'normal',

    '& th, & td': {
      padding: '25px 3%',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
    },

    '& tbody': {
      '& tr:hover': {
        backgroundColor: '#f5f5f5',
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
  tableContainer: {
    height: '100%',
    minHeight: '100vh',
    backgroundColor: backgroundBlue,
    padding: '20px 42px',
    '& > div': {
      backgroundColor: white,
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
    border: '1px solid #bdbdbd',
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
