import React from 'react';
import { apiDelete } from 'utils/axios';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
} from '@material-ui/core/';

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

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message,
      content: this.props.content,
      req: this.props.req,
      body: this.props.body,
      open: this.props.open,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    let body = this.state.body;
    let req = this.state.req;

    apiDelete(req, { case_note: body })
      .then(() => window.location.reload())
      .catch(error => console.error(error));
  }

  render() {
    let dialog;
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
            {this.state.message}
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
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
    return (
      <div>
        <MenuItem onClick={this.handleOpen}>Delete</MenuItem>
        {dialog}
      </div>
    );
  }
}

export default DeleteModal;
