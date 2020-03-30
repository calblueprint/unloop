/*
 * PaperworkForm Styles
 *
 * This contains all the styles for the PaperworkForm component.
 */

const grey = '#d2dce1';

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
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: '100%',
    textAlign: 'center',
    backgroundColor: grey,
    marginLeft: '8%',
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
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
