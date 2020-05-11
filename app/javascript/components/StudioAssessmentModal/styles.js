/*
 * QuestionnaireModal Styles
 *
 * This contains all the styles for the QuestionnaireModal component.
 */

const styles = theme => ({
  dialog: {
    borderRadius: theme.shape.borderRadius,
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '56px 114px 56px 56px',
  },
  content: {
    margin: '100px',
  },
});

export default styles;
