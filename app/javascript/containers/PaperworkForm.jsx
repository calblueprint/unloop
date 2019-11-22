import React from 'react';
import '../../assets/stylesheets/paperworks.scss';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
} from '@material-ui/core/';

const isValidUrl = string => {
  try {
    let test = new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

class PaperworkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant_id: this.props.participantId,
      link: '',
      paperwork_title: '',
      due_date: null,
      open: false,
      errors: {
        link: '',
      },
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  checkErrors() {
    const errors = {
      link: '',
    };

    if (!isValidUrl(this.state.link)) {
      errors.link = 'Please use a valid link beginning with http://';
    }

    return errors;
  }

  handleSubmit() {
    let body = {
      link: this.state.link,
      title: this.state.title,
      participant_id: this.state.participant_id,
      agree: false,
    };

    const errors = this.checkErrors();

    let hasErrors = false;
    Object.keys(errors).forEach(key => {
      if (errors[key]) {
        hasErrors = true;
      }
    });

    if (hasErrors) {
      this.setState({ errors });
    } else {
      body = JSON.stringify({ paperwork: body });
      const request = `/api/paperworks/`;
      fetch(request, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X_CSRF-Token': document.getElementsByName('csrf-token')[0].content,
        },
        body,
        credentials: 'same-origin',
      })
        .then(data => {
          window.location.reload();
        })
        .catch(data => {
          console.error(data);
        });
    }
  }

  renderError() {
    return <div style={{ color: 'red' }}>{this.state.errors.link}</div>;
  }

  render() {
    return (
      <div>
        <Fab
          variant="extended"
          size="small"
          style={{ borderStyle: 'solid 3px grey', background: '#FFFFFF' }}
          onClick={this.handleOpen}
        >
          + New Assignment
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <h2 className="dialogTitle"> Assign new paperwork </h2>
          </DialogTitle>
          <DialogContent maxWidth="sm" fullWidth>
            <DialogContentText className="dialogContentText">
              Assign Document Title
            </DialogContentText>
            <TextField
              className="dialogContentTextField"
              onChange={e => this.setState({ title: e.target.value })}
              variant="outlined"
              margin="dense"
              id="title"
              label="Insert Title"
              type="text"
              fullWidth
            />
          </DialogContent>
          <br />
          <DialogContent maxWidth="sm" fullWidth>
            <DialogContentText className="dialogContentText">
              Insert Link to Document
            </DialogContentText>
            <TextField
              className="dialogContentTextField"
              onChange={e => this.setState({ link: e.target.value })}
              variant="outlined"
              margin="dense"
              id="paperwork-link"
              label="Google Drive Link"
              type="text"
              fullWidth
            />
            {this.renderError()}
          </DialogContent>
          <br />
          {/* <DialogContent maxWidth="sm" fullWidth>
            <DialogContentText className="dialogContentText">
              Assign Due Date
            </DialogContentText>
            <TextField
              className="dialogContentTextField"
              onChange={(e) => this.setState({due_date: e.target.value})}
              variant="outlined"
              margin="dense"
              id="due-date"
              type="date"
              fullWidth
            />
          </DialogContent> */}
          <DialogActions className="dialogActions">
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
              Save Document
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PaperworkForm;
