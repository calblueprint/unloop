/**
 *
 * PaperworkForm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
  title,
  link,
  errors,
  checkErrors,
  onChange,
  handleSubmit,
  open,
  onClose,
}) {
  const renderError = field => (
    <Typography variant="body2" className={classes.error}>
      {errors[field]}
    </Typography>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h6" className={classes.fieldTitle}>
              Assign Document Title
            </Typography>
            <TextField
              value={title}
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
          </Grid>
          <Grid item>
            <Typography variant="h6" className={classes.fieldTitle}>
              Insert Link to Document
            </Typography>
            <TextField
              value={link}
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save Document
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PaperworkForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  checkErrors: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(withStyles(styles)(PaperworkForm));
