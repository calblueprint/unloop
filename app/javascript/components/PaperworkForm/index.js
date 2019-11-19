/**
 *
 * PaperworkForm
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
  DialogActions,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import styles from './styles';

function PaperworkForm({
  classes,
  errors,
  checkErrors,
  onChange,
  handleSubmit,
}) {
  const [open, setOpen] = useState(false);

  const renderError = field => (
    <Typography variant="body2" className={classes.error}>
      {errors[field]}
    </Typography>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        ASSIGN PAPERWORK +
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <Grid container direction="row" className={classes.titlePadding}>
          <div className={classes.titleBorder}>
            <Typography variant="h4">Assign new paperwork</Typography>
          </div>
        </Grid>
        <DialogContent>
          <Typography variant="h6" className={classes.fieldTitle}>
            Assign Document Title
          </Typography>
          <TextField
            className={classes.textField}
            onChange={e => onChange('title', e.target.value)}
            onBlur={checkErrors('title')}
            autoFocus
            variant="outlined"
            margin="dense"
            id="title"
            label="Insert Title"
            type="text"
            fullWidth
            InputProps={{ classes: { root: classes.textFieldBorder } }}
          />
          {renderError('title')}
        </DialogContent>
        <DialogContent>
          <Typography variant="h6" className={classes.fieldTitle}>
            Insert Link to Document
          </Typography>
          <TextField
            className={classes.textField}
            onChange={e => onChange('link', e.target.value)}
            onBlur={checkErrors('link')}
            variant="outlined"
            margin="dense"
            id="paperwork-link"
            label="Google Drive Link"
            type="text"
            fullWidth
            InputProps={{ classes: { root: classes.textFieldBorder } }}
          />
          {renderError('link')}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save Document
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

PaperworkForm.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  checkErrors: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default compose(withStyles(styles), memo)(PaperworkForm);
