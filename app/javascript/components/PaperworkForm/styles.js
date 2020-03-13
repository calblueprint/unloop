/*
 * PaperworkForm Styles
 *
 * This contains all the styles for the PaperworkForm component.
 */

const styles = theme => ({
  dialogActions: {
    padding: '30px',
  },
  titlePadding: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  titleBorder: {
    paddingBottom: 16,
    borderBottom: `5px solid ${theme.palette.secondary.main}`,
  },
  fieldTitle: {
    color: theme.palette.common.black,
    marginBottom: 5,
  },
  textField: {
    marginTop: 2,
    borderStyle: 'solid 4px grey',
  },
  textFieldBorder: {
    borderRadius: 0,
  },
  error: {
    color: theme.palette.error.main,
  },
});

export default styles;
