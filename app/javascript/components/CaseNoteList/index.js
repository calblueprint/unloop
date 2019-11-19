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

function CaseNoteList({ classes, caseNotes, formatDate }) {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Typography variant="h2">Case Notes</Typography>
        {/* <CaseNoteForm /> */}
      </Grid>
      <Grid item container direction="column">
        {caseNotes.map(caseNote => (
          <CaseNoteEntry
            key={caseNote.id}
            id={caseNote.id}
            title={caseNote.title}
            date={formatDate(caseNote.created_at)}
            description={caseNote.description}
            internal={caseNote.internal}
          />
        ))}
      </Grid>
    </Grid>
  );
}

CaseNoteList.propTypes = {
  classes: PropTypes.object.isRequired,
  caseNotes: PropTypes.array.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default compose(withStyles(styles), memo)(CaseNoteList);
