/**
 *
 * PaperworkList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, List } from '@material-ui/core';
import PaperworkEntry from 'components/PaperworkEntry';
import PaperworkForm from 'components/PaperworkForm';

import styles from './styles';

function PaperworkList({
  classes,
  paperworks,
  participantId,
  userType,
  formatDate,
}) {
  return (
    <Paper elevation={3} className={classes.containerStyle}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.componentTitle}
      >
        <Grid item>
          <Typography variant="h4">Paperworks</Typography>
        </Grid>
        <Grid item>
          <PaperworkForm
            type="create"
            hide={userType !== 'staff'}
            participantId={participantId}
          />
        </Grid>
      </Grid>
      <List className={classes.listStyle} dense>
        {paperworks.map((paperwork, i) => (
          <PaperworkEntry
            key={paperwork.id}
            agree={paperwork.agree}
            id={paperwork.id}
            participantId={participantId}
            link={paperwork.link}
            title={paperwork.title}
            date={formatDate(paperwork.created_at)}
            lastEntry={paperworks.length - 1 === i}
          />
        ))}
      </List>
    </Paper>
  );
}

PaperworkList.propTypes = {
  userType: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  paperworks: PropTypes.array.isRequired,
  participantId: PropTypes.number.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaperworkList);
