const styles = () => ({
  iconLarge: {
    width: 35,
    height: 35,
    minWidth: 35,
    minHeight: 35,
  },
  name: {
    maxWidth: 80,
  },
  r0Color: {
    backgroundColor: '#009FAD',
  },
  r1Color: {
    backgroundColor: '#5870EB',
  },
  status: {
    width: 52,
    height: 52,
    borderRadius: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '52px',
    color: '#fff',
  },
  newAssignment: {
    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyItems: 'center',
      '& svg': {
        paddingRight: 10,
      },
    },
  },
  caseNoteText: {
    width: '110px',
  },
  paperworkText: {
    width: '130px',
  },
  questionnaireStatus: {
    paddingLeft: 10,
  },
  arrow: {
    '& svg': {
      position: 'relative',
      left: -10,
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
});

export default styles;
