import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ActionItemParticipant from '../ActionItemParticipant';
import styles from './styles';

function ActionItemDisplayParticipants({ classes, selectedParticipants }) {
  // Julian importing the cards
  // let { participantCards } = this.props;

  let participantCards;

  if (selectedParticipants) {
    participantCards = selectedParticipants.map(p => (
      <ActionItemParticipant participant={p} key={p.id} />
    ));
  }

  return (
    <Grid
      container
      className={classes.boundaryBox}
      direction="column"
      justify="flex-start"
      wrap="nowrap"
    >
      {/* List students out */}
      {/* Julian passing in cards */}
      {participantCards}
    </Grid>
  );
}

ActionItemDisplayParticipants.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedParticipants: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionItemDisplayParticipants);
