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
    if (title === 'id' || title === 'participant') {
      return null;
    }

    const titleRender = title.replace(/([-_]\w)/g, group =>
      group.replace('-', ' ').replace('_', ' '),
    );
    const bodyRender = body === null ? 'N/A' : body;

    return (
      <Grid item key={title} className={classes.field}>
        <Typography variant="h6">{titleRender}</Typography>
        <Typography variant="body1">{bodyRender}</Typography>
      </Grid>
    );
  };

  return (
    <DialogContent>
      <label for="myfile">Select a file:</label>
      <input type="file" id="myfile" name="myfile"></input>
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
