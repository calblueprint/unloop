/**
 *
 * StudioAssessmentModal
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog } from '@material-ui/core';
import { StudioAssessmentForm } from 'components/StudioAssessmentForm';
import styles from './styles';

function StudioAssessmentModal({
  studioAssessment,
  participantId,
  userType,
  classes,
  type,
}) {
  const [open, setOpen] = useState(false);

  const content = (
    <StudioAssessmentForm
      onClose={() => setOpen(false)}
      studioAssessment={studioAssessment}
      participantId={participantId}
      userType={userType}
      classes={classes}
      type={type}
    />
  );

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        {type === 'create'
          ? 'New Studio Assessment'
          : type === 'edit'
            ? 'Edit Studio Assessment'
            : 'View Studio Assessment'
        }
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
        classes={{ paper: classes.dialog }}
      >
        {content}
      </Dialog>
    </>
  );
}

StudioAssessmentModal.propTypes = {
  participantId: PropTypes.number.isRequired,
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  studioAssessment: PropTypes.object,
};

export default memo(withStyles(styles)(StudioAssessmentModal));
