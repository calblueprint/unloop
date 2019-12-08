/**
 *
 * PaperworkForm
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import validator from 'validator';
import { apiPost, apiPatch, apiDelete } from 'utils/axios';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';

import styles from './styles';

function PaperworkForm({
  classes,
  type,
  hide,
  paperworkTitle,
  paperworkLink,
  paperworkId,
  participantId,
}) {
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [paperwork, setPaperwork] = useState({
    title: paperworkTitle,
    link: paperworkLink,
  });
  const [errors, setErrors] = useState({ title: '', link: '' });

  useEffect(() => {
    setPaperwork({ title: paperworkTitle, link: paperworkLink });
    setErrors({ title: '', link: '' });
  }, [open]);

  const checkErrors = field => () => {
    let errorMessage = '';
    if (field === 'title') {
      const { title } = paperwork;
      if (
        title === '' ||
        validator.isEmpty(title, { ignore_whitespace: true })
      ) {
        errorMessage = 'Title is required';
      }
    } else if (field === 'link') {
      const { link } = paperwork;
      if (link === '' || validator.isEmpty(link, { ignore_whitespace: true })) {
        errorMessage = 'Link is required';
      } else if (!validator.isURL(link, { require_protocol: true })) {
        errorMessage = 'Link is not valid';
      }
    }

    setErrors({
      ...errors,
      [field]: errorMessage,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const body = {
      ...paperwork,
      participant_id: participantId,
      agree: false,
    };

    let hasErrors = false;
    Object.keys(errors).forEach(field => {
      checkErrors(field)();
      hasErrors = hasErrors || errors[field] !== '';
    });

    if (!hasErrors) {
      if (type === 'create') {
        apiPost('/api/paperworks', { paperwork: body })
          .then(() => window.location.reload())
          .catch(error => console.error(error));
        // TODO: Change this to flash an error message
      } else {
        apiPatch(`/api/paperworks/${paperworkId}`, { paperwork: body })
          .then(() => window.location.reload())
          .catch(error => console.error(error));
        // TODO: Change this to flash an error message
      }
    }
  };

  const handleDelete = event => {
    event.preventDefault();
    if (type === 'edit') {
      apiDelete(`/api/paperworks/${paperworkId}`)
        .then(() => {
          setDeleteModal(false);
          setOpen(false);
          window.location.reload();
        })
        .catch(error => console.log(error));
    }
  };

  const onFieldChange = (field, value) => {
    setPaperwork({ ...paperwork, [field]: value });
  };

  const button = () => {
    let ret;
    if (!hide) {
      if (type === 'create') {
        ret = (
          <Button
            className="assign-paperwork-button"
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            ASSIGN PAPERWORK +
          </Button>
        );
      } else if (type === 'edit') {
        ret = (
          <Button
            className="assign-paperwork-button"
            variant="text"
            color="primary"
            onClick={() => setOpen(true)}
          >
            edit
          </Button>
        );
      }
    }
    return ret;
  };

  const deleteModal = () => (
    <Dialog
      open={openDeleteModal}
      onClose={() => setDeleteModal(false)}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Are you sure you want to delete this paperwork?</DialogTitle>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  const dialogOptions = () => {
    let ret;
    if (type === 'create') {
      ret = (
        <Grid container direction="row-reverse">
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Save Document
            </Button>
          </Grid>
        </Grid>
      );
    }
    if (type === 'edit') {
      ret = (
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              onClick={event => {
                event.preventDefault();
                setDeleteModal(true);
              }}
            >
              Delete Document
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Save Document
            </Button>
          </Grid>
        </Grid>
      );
    }
    return ret;
  };

  return (
    <>
      {button()}
      {deleteModal()}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <Grid container direction="row" className={classes.titlePadding}>
          <div className={classes.titleBorder}>
            <Typography variant="h4">
              {type === 'create' ? 'Assign new paperwork' : 'Edit paperwork'}
            </Typography>
          </div>
        </Grid>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <DialogContent>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6" className={classes.fieldTitle}>
                  Assign Document Title
                </Typography>
                <TextField
                  value={paperwork.title}
                  className={classes.textField}
                  onChange={e => onFieldChange('title', e.target.value)}
                  onBlur={checkErrors('title')}
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="title"
                  label="Insert Title"
                  type="text"
                  fullWidth
                  InputProps={{ classes: { root: classes.textFieldBorder } }}
                  error={errors.title !== ''}
                  helperText={errors.title}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" className={classes.fieldTitle}>
                  Insert Link to Document
                </Typography>
                <TextField
                  value={paperwork.link}
                  className={classes.textField}
                  onChange={e => onFieldChange('link', e.target.value)}
                  onBlur={checkErrors('link')}
                  variant="outlined"
                  margin="dense"
                  id="paperwork-link"
                  label="Google Drive Link"
                  placeholder="https://google.com"
                  type="text"
                  fullWidth
                  InputProps={{ classes: { root: classes.textFieldBorder } }}
                  error={errors.link !== ''}
                  helperText={errors.link}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            {dialogOptions()}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

PaperworkForm.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  hide: PropTypes.bool,
  paperworkTitle: PropTypes.string,
  paperworkLink: PropTypes.string,
  participantId: PropTypes.number.isRequired,
  paperworkId: PropTypes.number,
};

PaperworkForm.defaultProps = {
  type: 'create',
  hide: false,
  paperworkTitle: '',
  paperworkLink: '',
  paperworkId: null,
};

export default memo(withStyles(styles)(PaperworkForm));
