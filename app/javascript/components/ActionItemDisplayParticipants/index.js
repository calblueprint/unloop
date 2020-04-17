import React from 'react';
import { Box, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ActionItemParticipant from '../ActionItemParticipant';
import styles from './styles';
import theme from '../../utils/theme';

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
    <div className={classes.displayParticipant}>
      {/* Students top bar */}
      <div style={{ color: theme.palette.common.indigo }}>
        Students
        <Box className={classes.boxProps} />
        <Divider />
      </div>

      <Box className={classes.boundaryBox}>
        <div className={classes.displayScroll}>
          {/* List students out */}
          <div style={{ direction: 'ltr' }}>
            {/* Julian passing in cards */}
            {participantCards}
          </div>
        </div>
      </Box>
    </div>
  );
}

ActionItemDisplayParticipants.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedParticipants: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionItemDisplayParticipants);
