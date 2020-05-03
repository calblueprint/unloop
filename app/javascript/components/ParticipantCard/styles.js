const styles = theme => ({
  iconLarge: {
    width: 30,
    height: 30,
    minWidth: 30,
    minHeight: 30,
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
    width: 80,
    height: 25,
    borderRadius: 14,
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '25px',
    color: theme.palette.common.white,
    fontSize: '12px',
    backgroundColor: ({ participant }) => {
      switch (participant.status.toUpperCase()) {
        case 'R0':
          return theme.palette.common.r0;
        case 'R1':
          return theme.palette.common.r1;
        case 'R2':
          return theme.palette.common.r2;
        case 'Studio':
          return theme.palette.common.studio;
        default:
          console.error('Participant has no status');
          return theme.palette.common.darkestBlue;
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
