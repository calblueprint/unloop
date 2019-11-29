import React, { memo, useState, useEffect } from 'react';
import { apiPost, apiDelete } from 'utils/axios';
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
  MenuItem,
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
      tempTitle: this.props.title,
      tempDescription: this.props.description,
      tempInternal: this.props.internal,
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
      const newTitle = this.state.tempTitle;
      const newDescription = this.state.tempDescription;
      const newInternal = this.state.tempInternal;

      this.setState({
        title: newTitle,
        description: newDescription,
        internal: newInternal,
      });

      const body = {
        "title": this.state.tempTitle,
        "description": this.state.tempDescription,
        "internal": this.state.tempInternal,
        "participant_id": this.state.participant_id,
      };

      body = JSON.stringify({case_note: body});
      let req = '/api/case_notes/' + this.state.id;

      fetch(req, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
        },
        body: body,
        credentials: 'same-origin',
      }).then((data) => {window.location.reload()}).catch((data) => { console.error(data) });
    } else if (this.state.type === "delete") {
      const body = {
        "title": this.state.title,
        "description": this.state.description,
        "internal": this.state.internal,
        "participant_id": this.state.participant_id,
      };
      let req = '/api/case_notes/' + this.state.id;

      apiDelete(req, { case_note: body })
        .then(() => window.location.reload())
        .catch(error => console.error(error));
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
    else if (this.state.type === "delete") {
      ret = (
        <MenuItem onClick={this.handleOpen}>Delete</MenuItem>
      );
    }
    return ret;
  }

  render() {
    let title;

    if (this.state.type === "create") {
      title = "title"
    } else if (this.state.type === "edit") {
      title = "tempTitle"
    }

    let description;
    if (this.state.type === "create") {
      description = "description"
    } else if (this.state.type === "edit") {
      description = "tempDescription";
    }

    let internal;
    if (this.state.type === "create") {
      internal = "internal";
    } else if (this.state.type === "edit") {
      internal = "tempInternal";
    }

    let dialog;
    if (this.state.type === "create" || this.state.type === "edit") {
      dialog = (
        <Dialog
          style={styles.dialogStyle}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogContent maxwidth="sm">
            <DialogContentText style={styles.dialogContentTextStyle}>
              Title
            </DialogContentText>
            <TextField
              value={this.state.type === "create" ? this.state.title : this.state.tempTitle}
              style={styles.dialogContentTextFieldStyle}
              name="title"
              onChange={this.handleChange(title)}
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
                value={this.state.type === "create" ? this.state.description.text : this.state.description}
                onChange={this.handleDescriptionChange(description)}
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
                value={this.state.internal}
                onChange={this.handleInternalChange(internal)}
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
              {this.state.type === "create" ? 'Submit Case Note' : 'Edit Casenote'}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    else if (this.state.type === "delete") {
      dialog = (
        <Dialog
          style={styles.dialogStyle}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth>
            <DialogContent maxwidth="sm">
              <DialogContentText style={styles.dialogContentTextStyle}>
                Are you sure you want to delete the following casenote?
              </DialogContentText>

              <DialogContentText style={styles.dialogContentTextStyle}>
                {this.state.title}
              </DialogContentText>

              <MUIRichTextEditor
                  value={this.state.description}
                  readOnly={true}
                  toolbar={false}
              />
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
                Delete
              </Button>
            </DialogActions>

        </Dialog>
      );
    }

    return (
      <>
        {this.button()}
        {dialog}
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
