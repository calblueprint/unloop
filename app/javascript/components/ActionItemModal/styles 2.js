const styles = theme => ({
  overrides: {
    MuiDialogContent: {
      root: {
        padding: '8px 12px',
      },
    },
    MuiDialogContentText: {
      root: {
        marginBottom: '0px',
      },
    },
    MuiDialog: {
      paperFullWidth: {
        minWidth: '550px',
        width: '550px',
      },
    },
  },
  buttonStyle: {
    marginLeft: 'auto',
    marginRight: '0',
  },
  dialogContentStyle: {
    padding: '8px 12px',
  },
  dialogPaperStyle: {
    minWidth: '550px',
    width: '550px',
  },
  actionItemDescStyle: {
    marginLeft: '20px',
    paddingTop: '20px',
  },
  dialogActionsStyle: {
    padding: '30px',
  },
  dialogContentTextStyle: {
    color: 'black',
    marginBottom: '2px',
  },
  dialogContentTextFieldStyle: {
    marginTop: '2px',
    borderStyle: 'solid 4px grey',
    backgroundColor: theme.palette.common.searchBox,
  },
  MUIRichTextEditorStyle: {
    border: '5px solid',
    padding: '10px',
  },
  modalItems: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '750px',
    height: '100%',
    margin: 'auto',
    backgroundColor: 'white',
    padding: '50px',
  },
  actionItemDescriptionStyle: {
    height: '380px',
    overflow: 'auto',
  },
  backgroundColor: {
    backgroundColor: '#28303B',
    padding: '50px',
  },
  formStyle: {
    width: '400px',
    padding: '10px',
    minHeight: '425px',
    display: 'block',
  },
  titleStyle: {
    color: 'white',
    fontSize: '36px',
    marginBottom: '0',
    marginTop: '0',
  },
  iconStyle: {
    backgroundColor: theme.palette.common.lighterBlue,
    paddingLeft: '30px',
    paddingRight: '30px',
    margin: '0px 10px',
    boxShadow: 'None',
  },
  categoryButtonStyle: {
    fontSize: '10px',
    textAlign: 'center',
    width: 60,
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  searchBar: {
    width: '100%',
    borderStyle: 'solid',
    padding: '0px',
    '& input': {
      padding: '5px 5px',
    },
    backgroundColor: theme.palette.common.searchBox,
  },
  listStyle: {
    overflow: 'auto',
    width: '100%',
    maxHeight: '100%',
    height: '30vh',
    minHeight: '240px',
    marginBottom: '20px',
  },
  checkboxTextStyle: {
    color: theme.palette.common.indigo,
    fontSize: '12px',
    margin: '5px',
  },
  checkboxStyle: {
    margin: '0px',
    paddingRight: '0px',
  },
});

export default styles;
