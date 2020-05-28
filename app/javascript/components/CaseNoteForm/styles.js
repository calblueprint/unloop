import { createMuiTheme } from '@material-ui/core/styles';
import theme from 'utils/theme';

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
    borderStyle: 'solid',
  },
  primaryButton: {
    border: 'none',
    boxShadow: 'none',
  },
  plusButton: {
    width: 32,
    height: 32,
    minHeight: 32,
    minWidth: 32,
    lineHeight: '32px',
    borderRadius: '100%',
    textAlign: 'center',
    backgroundColor: theme.palette.common.grey,
    marginLeft: '8%',
    fontSize: 18,
    fontWeight: 300,
  },
});

const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        borderLeft: `solid 1px ${theme.palette.common.lightGrey}`,
        borderRight: `solid 1px ${theme.palette.common.lightGrey}`,
        borderBottom: `solid 1px ${theme.palette.common.lightGrey}`,
        borderRadius: '4px',
      },
      hidePlaceholder: {
        display: 'block',
      },
      editorContainer: {
        padding: '20px',
        overflow: 'auto',
        height: '130px',
      },
      toolbar: {
        backgroundColor: theme.palette.common.lightestGrey,
      },
    },
  },
});

export { styles, defaultTheme };
