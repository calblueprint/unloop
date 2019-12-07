/*
 * CaseNoteCard Styles
 *
 * This contains all the styles for the CaseNoteCard container.
 */

export const styles = (/* theme */) => ({
  casenoteCardStyle: {
    marginLeft: '20px',
    padding: '20px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: '10px',
    height: '200px',
  },
  casenoteDescStyle: {
    overflow: 'auto',
    height: '100px',
    marginTop: '-20px',
  },
  dialogActionsStyle: {
    padding: '30px',
  },
  MUIRichTextEditorStyle: {
    border: '5px solid',
    padding: '10px',
  },
  dialogStyle: {
    padding: '20px',
  },
  dialogContentTextStyle: {
    color: 'black',
    marginBottom: '2px',
  },
  dialogContentTextFieldStyle: {
    marginTop: '2px',
    borderStyle: 'solid 4px grey',
  },
  saveDocumentButtonStyle: {
    borderStyle: 'solid 3px grey',
  },
});

export default styles;
