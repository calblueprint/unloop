/*
 * QuestionnaireModal Styles
 *
 * This contains all the styles for the QuestionnaireModal component.
 */

const styles = theme => ({
  form: {
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
  },
  questions: {
    backgroundColor: theme.palette.common.lightBlue,
    padding: '20px',
    borderRadius: '10px',
  },
  header: {
    borderBottom: `5px solid ${theme.palette.primary.main}`,
  },
  button: {
    margin: theme.spacing(1),
    width: '20%',
  },
  TextField: {
    width: '100%',
    paddingBottom: '20px',
  },
  radio: {
    marginTop: '20px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: theme.palette.common.lightBlue,
  },
  comments: {
    paddingBottom: '50px',
  },
  buttons: {
    paddingTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'right',
    justifyContent: 'right',
  },
});

export default styles;
