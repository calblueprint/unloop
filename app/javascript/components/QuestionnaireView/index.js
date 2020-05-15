/**
 *
 * QuestionnaireView
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DialogContent, Grid, Typography, Button } from '@material-ui/core';

import styles from './styles';

function QuestionnaireView({ classes, questionnaire, resumeURL }) {
  const renderField = (title, body) => {
    if (
      title === 'participant' ||
      title === 'id' ||
      title === 'updated_at' ||
      title === 'created_at'
    ) {
      return null;
    }

    let titleRender = title.replace(/([-_]\w)/g, group =>
      group.replace('-', ' ').replace('_', ' '),
    );

    if (title === 'emergency_contact_2_name') {
      titleRender = 'Second Emergency Contact (optional)';
    } else if (title === 'emergency_contact_2_phone_number') {
      titleRender = 'Second Emergency Contact Phone Number (optional)';
    } else if (title === 'emergency_contact_2_relationship') {
      titleRender = 'Second Emergency Contact Relationship (optional)';
    }

    const bodyRender = body === null ? 'N/A' : body;

    return (
      <Grid item key={title} className={classes.field}>
        <Typography variant="h6">{titleRender}</Typography>
        <Typography variant="body1">{bodyRender}</Typography>
      </Grid>
    );
  };

  const showUploadedFile = () => {

    if (resumeURL) {
      return (
        <Grid item className={classes.field}>
          <Typography variant="h6">Resume</Typography>
          <Button onClick={() => window.open(resumeURL, '_blank')}>
            View Uploaded Resume
        </Button>
        </Grid>
      );
    }
    return (<Grid item className={classes.field}>
      <Typography variant="h6">Resume</Typography>
      <Button >
        No Resume Uploaded
   </Button>
    </Grid>);
  }

  return (
    <DialogContent>
      <Grid container direction="column">
        {Object.entries(questionnaire).map(field =>
          renderField(field[0], field[1]),
        )}
        {showUploadedFile()}
      </Grid>
    </DialogContent>
  );
}

QuestionnaireView.propTypes = {
  classes: PropTypes.object.isRequired,
  questionnaire: PropTypes.object.isRequired,
};

export default memo(withStyles(styles)(QuestionnaireView));
