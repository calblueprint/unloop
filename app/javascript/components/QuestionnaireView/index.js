/**
 *
 * QuestionnaireView
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DialogContent, Grid, Typography } from '@material-ui/core';

import styles from './styles';

function QuestionnaireView({ classes, questionnaire }) {
  const renderField = (title, body) => {
    if (title === 'id' || title === 'updated_at' || title === 'created_at') {
      return null;
    }
    console.log(title);

    const titleRender = title.replace(/([-_]\w)/g, group =>
      group.replace('-', ' ').replace('_', ' '),
    );
    const bodyRender = body === null ? 'N/A' : body;

    if (title === 'birthdate') {
      const reformatDate = `${bodyRender.substring(5)}-${bodyRender.substring(
        0,
        4,
      )}`;
      return (
        <Grid item key={title} className={classes.field}>
          <Typography variant="h6">{titleRender}</Typography>
          <Typography variant="body1">{reformatDate}</Typography>
        </Grid>
      );
    }
    return (
      <Grid item key={title} className={classes.field}>
        <Typography variant="h6">{titleRender}</Typography>
        <Typography variant="body1">{bodyRender}</Typography>
      </Grid>
    );
  };

  return (
    <DialogContent>
      <Grid container direction="column">
        {Object.entries(questionnaire).map(field =>
          renderField(field[0], field[1]),
        )}
      </Grid>
    </DialogContent>
  );
}

QuestionnaireView.propTypes = {
  classes: PropTypes.object.isRequired,
  questionnaire: PropTypes.object.isRequired,
};

export default memo(withStyles(styles)(QuestionnaireView));
