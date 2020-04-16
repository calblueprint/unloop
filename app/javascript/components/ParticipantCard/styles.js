const styles = theme => ({
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
    backgroundColor: theme.palette.common.r0,
  },
  r1Color: {
    backgroundColor: theme.palette.common.r1,
  },
  status: {
    width: 52,
    height: 52,
    borderRadius: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '52px',
    color: theme.palette.common.white,
    backgroundColor: ({ participant }) => {
      switch (participant.status.toUpperCase()) {
        case 'R0':
          return theme.palette.common.r0;
        case 'R1':
          return theme.palette.common.r1;
        case 'R2':
          return theme.palette.common.r2;
        default:
          console.error('Participant has no status');
          return theme.palette.common.black;
      }
    },
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
});

export default styles;
