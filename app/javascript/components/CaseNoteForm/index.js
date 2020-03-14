import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { apiPost, apiPatch } from 'utils/axios';
import { convertToRaw } from 'draft-js';
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
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import MUIRichTextEditor from 'mui-rte';
import { styles, defaultTheme } from './styles';

class CaseNoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      participant_id: this.props.participantId,
      internal: this.props.internal,
      open: false,
      type: this.props.type,
      id: this.props.id,
      tempDescription: this.props.description,
      errors: {
        title: '',
      },
      display: this.props.display,
    };
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

  checkErrors = field => () => {
    let errorMessage = '';
    if (field === 'title') {
      const { title } = this.state;
      if (
        title === '' ||
        validator.isEmpty(title, { ignore_whitespace: true })
      ) {
        errorMessage = 'Title is required';
      }
    }

    this.setState(prevState => ({
      errors: { ...prevState.errors, [field]: errorMessage },
    }));
  };

  handleChange = name => event => {
    const { value } = event.target;
    this.setState({ [name]: value });
  };

  handleInternalChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleDescriptionChange = name => state => {
    const value = JSON.stringify(convertToRaw(state.getCurrentContent()));
    this.setState({ [name]: value });
  };

  handleSubmit() {
    const { type } = this.state;

    let hasErrors = false;
    Object.keys(this.state.errors).forEach(field => {
      this.checkErrors(field)();
      hasErrors = hasErrors || this.state.errors[field] !== '';
    });

    if (!hasErrors) {
      if (type === 'create') {
        const body = {
          title: this.state.title,
          description: this.state.description,
          internal: this.state.internal,
          participant_id: this.state.participant_id,
        };

        apiPost('/api/case_notes', { case_note: body })
          .then(() => window.location.reload())
          .catch(error => console.error(error));
      } else {
        this.setState(prevState => ({
          description: prevState.tempDescription,
        }));

        const body = {
          title: this.state.title,
          description: this.state.tempDescription,
          internal: this.state.internal,
          participant_id: this.state.participant_id,
        };

        apiPatch(`/api/case_notes/${this.state.id}`, { case_note: body })
          .then(() => window.location.reload())
          .catch(error => console.error(error));
      }
    }
  }

  button = () => {
    let ret;
    if (this.state.display === 'plus') {
      ret = (
        <button
          onClick={this.handleOpen}
          className={this.props.classes.plusButton}
          type="button"
        >
          +
        </button>
      );
    } else if (this.state.type === 'create') {
      ret = (
        <Button
          className="primary-button"
          variant="contained"
          color="secondary"
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
    const { classes } = this.props;
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
          className={classes.dialogStyle}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogContent maxwidth="sm">
            <DialogContentText className={classes.dialogContentTextStyle}>
              Title
            </DialogContentText>
            <TextField
              value={this.state.title}
              className={classes.dialogContentTextFieldStyle}
              name="title"
              onChange={this.handleChange('title')}
              onBlur={this.checkErrors('title')}
              variant="outlined"
              margin="dense"
              id="title"
              label="Case Note title"
              type="text"
              fullWidth
              error={this.state.errors.title !== ''}
              helperText={this.state.errors.title}
            />
          </DialogContent>
          <br />

          <DialogContent maxwidth="sm">
            <DialogContentText className={classes.dialogContentTextStyle}>
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
                label="Case Note description"
                className={classes.MUIRichTextEditorStyle}
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
            <DialogContentText className={classes.dialogContentTextStyle}>
              Visible to Participant
              <Switch
                name="internal"
                checked={this.state.internal}
                onChange={this.handleInternalChange('internal')}
                value="internal"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions className={classes.dialogActionsStyle}>
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

CaseNoteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['create', 'edit']),
  title: PropTypes.string,
  description: PropTypes.string,
  internal: PropTypes.bool,
  display: PropTypes.string,
  id: PropTypes.number,
  participantId: PropTypes.number.isRequired,
};

CaseNoteForm.defaultProps = {
  type: 'create',
  title: '',
  description: '',
  internal: true,
};

export default withStyles(styles)(CaseNoteForm);