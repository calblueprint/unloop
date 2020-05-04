/*
 * CaseNoteCard Styles
 *
 * This contains all the styles for the CaseNoteCard container.
 */

export const styles = theme => ({
  buttonStyle: {
    marginTop: '5px',
    marginBottom: '10px',
  },
  caseNoteCardStyle: {
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: theme.shape.borderRadius,
    height: '240px',
    marginTop: '20px',
  },
  caseNoteDescStyle: {
    height: '105px',
    marginTop: '-20px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: '0',
  },
  casenoteCardTitleStyle: {
    whiteSpace: 'nowrap',
    overflowY: 'hidden',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: '10px',
  },
});

export default styles;
