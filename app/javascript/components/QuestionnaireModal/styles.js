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
    padding: '20px 145px 20px 25px',
  },
  titleText: {
    fontSize: '24px',
  },
});

export default styles;
