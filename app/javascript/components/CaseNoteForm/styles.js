import { createMuiTheme } from '@material-ui/core/styles';

const grey = '#d2dce1';

const styles = () => ({
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
  },
});

const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        borderLeft: 'solid 1px #C4C4C4',
        borderRight: 'solid 1px #C4C4C4',
        borderBottom: 'solid 1px #C4C4C4',
        borderRadius: '4px',
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

export { styles, defaultTheme };
