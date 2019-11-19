/**
 *
 * CaseNoteForm
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';

import styles from './styles';

function CaseNoteForm({ classes }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        Create New Case Note
      </Button>
      <Dialog
        style={styles.dialogStyle}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent maxwidth="sm">
          <DialogContentText style={styles.dialogContentTextStyle}>
            Title
          </DialogContentText>
          <TextField
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
        <DialogContent maxwidth="sm">
          <DialogContentText style={styles.dialogContentTextStyle}>
            Description
          </DialogContentText>
          <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
              name="description"
              value={this.state.description.text}
              onChange={this.handleDescriptionChange('description')}
              variant="outlined"
              label="Case Note description"
              style={styles.MUIRichTextEditorStyle}
            />
          </MuiThemeProvider>
        </DialogContent>
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
    </div>
  );
}

CaseNoteForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), memo)(CaseNoteForm);
