import React from 'react';
import { apiPost, apiPatch } from 'utils/axios';
import { EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Switch,
} from '@material-ui/core/';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIRichTextEditor from 'mui-rte';
import PropTypes from 'prop-types';

const styles = {
  dialogActionsStyle: {
    padding: '30px',
  },
  MUIRichTextEditorStyle: {
    border: '5px solid',
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
    borderStyle: 'solid 4px grey',
  },
  saveDocumentButtonStyle: {
    borderStyle: 'solid 3px grey',
  },
};
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

class CaseNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      participantId: this.props.participantId,
      internal: this.props.internal,
      open: false,
      type: this.props.type,
      id: this.props.id,
      tempDescription: this.props.description,
      editorState: EditorState.createEmpty(),
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
    this.setState({
      open: false,
      title: this.props.title,
      internal: this.props.internal,
    });
    if (this.state.type === 'edit') {
      this.state.title = this.props.title;
      this.state.description = this.props.description;
      this.state.internal = this.props.internal;
    }
  }

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleInternalChange = name => event => {
    this.setState({ [name]: !this.state.internal });
  };

  handleDescriptionChange = name => state => {
    // TODO: the line below is the rtf representation. Update to this once rtf on /casenotes
    const value = JSON.stringify(convertToRaw(state.getCurrentContent()));
    // const value = state.getCurrentContent().getPlainText();
    this.setState({ [name]: value });
  };

  handleSubmit() {
    if (this.state.type === 'create') {
      const body = {
        title: this.state.title,
        description: this.state.description,
        internal: this.state.internal,
        participant_id: this.state.participantId,
      };
      apiPost('/api/case_notes', { case_note: body })
        .then(() => window.location.reload())
        .catch(error => console.error(error));
    } else if (this.state.type === 'edit') {
      const newTitle = this.state.title;
      const newDescription = this.state.tempDescription;
      const newInternal = this.state.internal;

      this.setState({
        title: newTitle,
        description: newDescription,
        internal: newInternal,
      });

      const body = {
        title: this.state.title,
        description: this.state.tempDescription,
        internal: this.state.internal,
        participant_id: this.state.participantId,
      };

      apiPatch(`/api/case_notes/${this.state.id}`, { case_note: body })
        .then(() => window.location.reload())
        .catch(error => console.error(error));
    }
  }

  button = () => {
    let ret;
    if (this.state.type === 'create') {
      ret = (
        <Button
          className="primary-button"
          variant="contained"
          color="primary"
          onClick={this.handleOpen}
        >
          NEW CASENOTE +
        </Button>
      );
    } else if (this.state.type === 'edit') {
      ret = <MenuItem onClick={this.handleOpen}>Edit</MenuItem>;
    }
    return ret;
  };

  render() {
    console.log('STATE');
    console.log(this.state.internal);
    console.log('PROPS');
    console.log(this.props.internal);
    let description;
    if (this.state.type === 'create') {
      description = 'description';
    } else if (this.state.type === 'edit') {
      description = 'tempDescription';
    }

    let dialog;
    if (this.state.type === 'create' || this.state.type === 'edit') {
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
              value={this.state.title}
              style={styles.dialogContentTextFieldStyle}
              name="title"
              onChange={this.handleChange('title')}
              variant="outlined"
              margin="dense"
              id="title"
              label="Case Note title"
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
                value={
                  this.state.type === 'create'
                    ? this.state.description.text
                    : this.state.description
                }
                onChange={this.handleDescriptionChange(description)}
                variant="outlined"
                label="Case Note description"
                style={styles.MUIRichTextEditorStyle}
                controls={[
                  'bold',
                  'italic',
                  'underline',
                  'numberList',
                  'bulletList',
                  'link',
                ]}
              />
            </MuiThemeProvider>
          </DialogContent>
          <br />
          <DialogContent>
            <DialogContentText style={styles.dialogContentTextStyle}>
              Visible to Participant
              <Switch
                name="internal"
                defaultChecked={
                  this.state.type === 'create' ? false : !this.props.internal
                }
                value={!this.props.internal}
                onChange={this.handleInternalChange('internal')}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
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
              {this.state.type === 'create'
                ? 'Submit Case Note'
                : 'Edit Casenote'}
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

CaseNoteForm.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  internal: PropTypes.bool,
  description: PropTypes.string,
  open: PropTypes.bool,
  participantId: PropTypes.number,
};

export default CaseNoteForm;
