import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { apiDelete } from 'utils/axios';
import * as Sentry from '@sentry/browser';
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
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'DeleteModal');
          scope.setExtra('action', 'apiDelete');
          scope.setExtra('case_note', body);
        });
        Sentry.captureException(error);
      });
  }

  render() {
    const { classes } = this.props;
    const dialog = (
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
            {this.state.message}
          </DialogContentText>
        </DialogContent>

        <DialogActions className={classes.dialogActionsStyle}>
          <Button
            onClick={this.handleClose}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleSubmit}
            variant="contained"
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
  classes: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired,
  req: PropTypes.string.isRequired,
  message: PropTypes.string,
};

export default withStyles(styles)(DeleteModal);
