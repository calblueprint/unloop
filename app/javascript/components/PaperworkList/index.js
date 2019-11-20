/**
 *
 * PaperworkList
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, Paper, List } from '@material-ui/core';
import PaperworkEntry from 'components/PaperworkEntry';
import PaperworkFormContainer from 'containers/PaperworkFormContainer';

import styles from './styles';

function PaperworkList({ classes, paperworks, participantId, formatDate }) {
  const [openForm, setOpenForm] = useState(false);
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
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenForm(true)}
          >
            ASSIGN PAPERWORK +
          </Button>
          <PaperworkFormContainer
            participantId={participantId}
            open={openForm}
            onClose={() => setOpenForm(false)}
          />
        </Grid>
      </Grid>
      <List style={styles.listStyle} dense>
        {paperworks.slice(0, -1).map(paperwork => (
          <PaperworkEntry
            key={paperwork.id}
            agree={paperwork.agree}
            id={paperwork.id}
            link={paperwork.link}
            title={paperwork.title}
            date={formatDate(paperwork.created_at)}
          />
        ))}
        {paperworks.slice(-1).map(paperwork => (
          <PaperworkEntry
            key={paperwork.id}
            agree={paperwork.agree}
            id={paperwork.id}
            link={paperwork.link}
            title={paperwork.title}
            date={formatDate(paperwork.created_at)}
            lastEntry
          />
        ))}
      </List>
    </Paper>
  );
}

PaperworkList.propTypes = {
  classes: PropTypes.object.isRequired,
  paperworks: PropTypes.array.isRequired,
  participantId: PropTypes.number.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default compose(withStyles(styles), memo)(PaperworkList);
