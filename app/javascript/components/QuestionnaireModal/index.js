/**
 *
 * QuestionnaireModal
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import QuestionnaireForm from 'components/QuestionnaireForm';
import QuestionnaireView from 'components/QuestionnaireView';

import styles from './styles';

function QuestionnaireModal({
  classes,
  questionnaire,
  participantId,
  questionnaireType,
  userType,
}) {
  const [open, setOpen] = useState(false);
  const qType = questionnaireType.toUpperCase();

  let content;
  if (userType === 'staff') {
    content = (
      <QuestionnaireForm
        type={questionnaireType}
        participantId={participantId}
        questionnaire={questionnaire}
        handleClose={() => setOpen(false)}
      />
    );
  } else if (userType === 'participant') {
    content = (
      <QuestionnaireView
        type={questionnaireType}
        questionnaire={questionnaire}
        handleClose={() => setOpen(false)}
      />
    );
  }

  return (
    <>
      <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
        {qType} INTAKE FORM
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth
        classes={{ paper: classes.dialog }}
      >
        <Grid container direction="row" className={classes.title}>
          <Typography variant="h4">{qType} INFORMATION</Typography>   
        </Grid>
        {content}
      </Dialog>
    </>
  );
}

QuestionnaireModal.propTypes = {
  classes: PropTypes.object.isRequired,
  questionnaire: PropTypes.object.isRequired,
  participantId: PropTypes.number.isRequired,
  questionnaireType: PropTypes.oneOf(['personal', 'professional']).isRequired,
  userType: PropTypes.oneOf(['staff', 'participant']).isRequired,
};

export default memo(withStyles(styles)(QuestionnaireModal));
