import React from 'react';
import { Box, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ActionItemParticipant from '../ActionItemParticipant';
import styles from './styles';

// class ActionItemDisplayParticipants extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {

function ActionItemDisplayParticipants({ classes, selectedParticipants }) {
  // Julian importing the cards

  // let { participantCards } = this.props;

  let participantCards;

  if (selectedParticipants) {
    participantCards = selectedParticipants.map(p => (
      <ActionItemParticipant
        participant={p}
        backgroundColor={styles.participant}
      />
    ));
  }

  return (
    <div className={classes.displayParticipant}>
      {/* Students top bar */}
      <div className="students" style={{ color: '#5870EB' }}>
        Students
        <Box className={classes.boxProps} />
        <Divider />
      </div>

      <Box className={classes.boundaryBox}>
        <div className={classes.displayScroll}>
          {/* List students out */}
          <div className="participants" style={{ direction: 'ltr' }}>
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
