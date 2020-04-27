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
    color: theme.palette.common.darkestBlue,
    marginBottom: 5,
  },
  textField: {
    marginTop: 2,
    borderStyle: 'solid',
  },
  textFieldBorder: {
    borderRadius: 0,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: '100%',
    textAlign: 'center',
    backgroundColor: theme.palette.common.grey,
    marginLeft: '8%',
    fontSize: 18,
    fontWeight: 300,
    minHeight: 32,
    minWidth: 32,
    lineHeight: '32px',
  },
  error: {
    color: theme.palette.error.main,
  },
});

export default styles;
