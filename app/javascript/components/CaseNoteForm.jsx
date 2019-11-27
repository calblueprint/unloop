import React from 'react';
import { apiPost } from 'utils/axios';
import { convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Switch,
} from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIRichTextEditor from 'mui-rte';

const styles = {
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
  saveDocumentButtonStyle: {
    borderStyle: 'solid 3px grey',
  },
};

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        border: 'solid 1px #C4C4C4',
        borderRadius: '4px',
      },
      editor: {
        padding: '20px',
      },
    },
  },
});

class CaseNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      participant_id: this.props.participantId,
      internal: true,
      open: false,
      type: this.props.type,
      id: this.props.id,
    };
    this.onChange = editorState => this.setState({ editorState });
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleInternalChange = this.handleInternalChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleInternalChange = name => event => {
    this.setState({ [name]: !this.state.internal });
  };

  handleDescriptionChange = name => state => {
    // TODO: the line below is the rtf representation. Update to this once rtf on /casenotes
    const value = JSON.stringify(convertToRaw(state.getCurrentContent()));
    //const value = state.getCurrentContent().getPlainText();
    this.setState({ [name]: value });
  }

  handleSubmit() {
    if (this.state.type === "create") {
      const body = {
        title: this.state.title,
        description: this.state.description,
        internal: this.state.internal,
        participant_id: this.props.participantId,
      };
      apiPost('/api/case_notes', { case_note: body })
        .then(() => window.location.reload())
        .catch(error => console.error(error));
    } else if (this.state.type === "edit") {

    }
    
  }

  button = () => {
    let ret;
    if (this.state.type === "create") {
      ret = (
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleOpen}
        >
          CREATE NEW CASENOTE
        </Button>
      );
    } else if (this.state.type === "edit") {
      ret = (
        <MenuItem onClick={this.handleOpen}>Edit</MenuItem>
      );
    }
    return ret;
  }

  render() {
    let description;
    if (this.state.type === "create") {
      description = this.state.description.text;
    } else if (this.state.type === "edit") {
      description = this.state.description;
    }

    return (
      <>
        {this.button()}
        <Dialog
          style={styles.dialogStyle}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >
          <DialogContent maxwidth="sm">
            <DialogContentText style={styles.dialogContentTextStyle}>
              Title
            </DialogContentText>
            <TextField
              value={this.state.title}
              style={styles.dialogContentTextFieldStyle}
              name="title"
              value={this.state.title}
              onChange={this.handleChange('title')}
              variant="outlined"
              margin="dense"
              id="title"
              label="Case Note title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <br />

          <DialogContent maxwidth="sm">
            <DialogContentText style={styles.dialogContentTextStyle}>
              Description
            </DialogContentText>
            <MuiThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor
                name="description"
                value={description}
                onChange={this.handleDescriptionChange('description')}
                variant="outlined"
                label="Case Note description"
                style={styles.MUIRichTextEditorStyle}
                controls={["bold", "italic", "underline", "numberList", "bulletList", "link"]}
              />
            </MuiThemeProvider>
          </DialogContent>
          <br />

          <DialogContent>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Visible to Participant
              <Switch
                name="internal"
                defaultChecked={false}
                onChange={this.handleInternalChange('internal')}
                value={this.state.internal}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions style={styles.dialogActionsStyle}>
            <Button
              onClick={this.handleClose}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="outlined"
              color="primary"
            >
              Submit Case Note
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

CaseNoteForm.defaultProps = {
  type: 'create',
  title: '',
  description: '',
  internal: true,
  open: false,
};

export default CaseNoteForm;
