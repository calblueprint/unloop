
import { createMuiTheme } from '@material-ui/core/styles';


const styles = {
  buttonStyle: {
    marginLeft: 'auto',
    marginRight: '0',
  },
  actionItemDescStyle: {
    marginLeft: '20px',
    paddingTop: '20px',
  },
  dialogActionsStyle: {
    padding: '30px',
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
    borderStyle: 'solid 4px grey',
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
  titleStyle: {
    color: 'white',
    fontSize: '36px',
    marginBottom: '0',
    marginTop: '0',
  },
};

const theme = createMuiTheme();
Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        borderLeft: 'solid 1px #C4C4C4',
        borderRight: 'solid 1px #C4C4C4',
        borderBottom: 'solid 1px #C4C4C4',
        borderRadius: '4px',
        overflow: 'auto',
      },
      editorContainer: {
        padding: '20px',
        overflow: 'auto',
        height: '130px',
      },
      toolbar: {
        backgroundColor: '#F4F4F4',
      },
    },
  },
});

export {styles, theme};
