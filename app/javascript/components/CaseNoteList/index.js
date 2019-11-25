/**
 *
 * CaseNoteList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import CaseNoteForm from 'components/CaseNoteForm';
import CaseNoteEntry from 'components/CaseNoteEntry';

import styles from './styles';

function CaseNoteList({
  classes,
  caseNotes,
  formErrors,
  checkErrors,
  onFormFieldChange,
  handleSubmit,
  formatDate,
}) {
  return (
    <Grid container direction="column">
      <Grid item container className={classes.header}>
        <Typography variant="h4">Case Notes</Typography>
        {/* <CaseNoteForm
          formErrors={formErrors}
          checkErrors={checkErrors}
          onFormFieldChange={onFormFieldChange}
          handleSubmit={handleSubmit}
        /> */}
      </Grid>
      <Grid item container direction="column" spacing={2}>
        {caseNotes.map(caseNote => (
          <Grid item>
            <CaseNoteEntry
              key={caseNote.id}
              id={caseNote.id}
              title={caseNote.title}
              date={formatDate(caseNote.created_at)}
              description={caseNote.description}
              internal={caseNote.internal}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

CaseNoteList.propTypes = {
  classes: PropTypes.object.isRequired,
  caseNotes: PropTypes.array.isRequired,
  formErrors: PropTypes.object.isRequired,
  checkErrors: PropTypes.func.isRequired,
  onFormFieldChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default compose(withStyles(styles), memo)(CaseNoteList);
