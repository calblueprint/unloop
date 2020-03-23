/**
 *
 * StudioAssessmentModal
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog} from '@material-ui/core';
import styles from './styles';
import { StudioAssessmentForm } from './StudioAssessmentForm';

function StudioAssessmentModal(
  //  {classes, participantId}
  ) {
  const [open, setOpen] = useState(false);
  const content = <StudioAssessmentForm />;

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        New Studio Assessment
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
        // classes={{ paper: classes.dialog }}
      >
        {content}
      </Dialog>
    </>
  );
}

// StudioAssessmentModal.propTypes = {
//   participantId: PropTypes.number.isRequired,
// };

export default memo(withStyles(styles)(StudioAssessmentModal));
