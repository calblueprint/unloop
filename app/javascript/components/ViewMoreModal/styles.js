const styles = theme => ({
  buttonStyle: {
    marginLeft: 'auto',
    marginRight: '0',
  },
  caseNoteDescStyle: {
    margin: '20px',
  },
  dialogStyle: {
    padding: '20px',
  },
  dialogContentTextStyle: {
    color: theme.palette.common.darkestBlue,
    marginBottom: '2px',
  },
  modalItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '750px',
    height: '100%',
    margin: 'auto',
    backgroundColor: theme.palette.common.darkBlue,
  },
  backgroundColor: {
    backgroundColor: theme.palette.common.darkBlue,
    padding: '50px',
  },
  caseNoteCardModalDescriptionStyle: {
    height: '380px',
    overflow: 'auto',
  },
  titleStyle: {
    color: theme.palette.common.white,
    fontSize: '36px',
    marginBottom: '0',
    marginTop: '0',
  },
  dateTextStyle: {
    color: theme.palette.common.white,
    fontSize: '24px',
    marginBottom: '0',
    marginTop: '0',
  },
  iconStyle: {
    boxShadow: 'None',
    backgroundColor: theme.palette.common.lighterBlue,
  },
  categoryButtonStyle: {
    fontSize: '10px',
    textAlign: 'center',
    width: 60,
    paddingLeft: '8px',
    paddingRight: '8px',
    color: theme.palette.primary.main,
  },
});

export default styles;
