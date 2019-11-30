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
  const paperworkEntries = paperworks.map((paperwork, i) => (
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
  ));

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
        {paperworks.length !== 0 ? (
          paperworkEntries
        ) : (
          <div>
            <img
              src="/assets/noPaperworks.svg"
              className="no-paperworks-img"
              alt="no Case Notes"
            />
            <div className="no-paperworks-txt">
              <h3>No paperworks yet</h3>
              {userType === 'staff' ? (
                <p>Click on ASSIGN PAPERWORK + to assign one.</p>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
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
