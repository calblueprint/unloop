import React from 'react';
import PropTypes from 'prop-types';
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
import styles from './styles';

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message,
      req: this.props.req,
      body: this.props.body,
      open: false,
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
    const { body } = this.state;
    const { req } = this.state;

    apiDelete(req, { case_note: body })
      .then(() => window.location.reload())
      .catch(error => console.log(error));
  }

  render() {
    const dialog = (
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

DeleteModal.propTypes = {
  body: PropTypes.object.isRequired,
  req: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default DeleteModal;
