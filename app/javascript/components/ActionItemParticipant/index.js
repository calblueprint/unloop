import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import theme from 'utils/theme';
import PropTypes from 'prop-types';
import styles from './styles';

function ActionItemParticipant({
  classes,
  checked,
  participant,
  changeChecked,
}) {
  let button;

  if (checked != null) {
    // Checked or search, unchecked for display
    if (!checked) {
      button = <AddIcon styles={classes.participantSelect} color="disabled" />;
    } else {
      button = (
        <CheckCircleIcon styles={classes.participantSelect} color="disabled" />
      );
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={() => changeChecked(participant)}
      onClick={() => changeChecked(participant)}
    >
      <div className={classes.participant}>
        <div
          style={{
            display: 'flex',
            width: '70%',
            lineHeight: '36px',
            height: '36px',
          }}
        >
          <Box
            className={classes.participantBar}
            style={{
              backgroundColor: theme.palette.darkerButton[participant.status],
            }}
          />
          {participant.name}
        </div>
        {button}
      </div>
      <Divider />
    </div>
  );
}

ActionItemParticipant.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  participant: PropTypes.object.isRequired,
  changeChecked: PropTypes.func,
};

export default withStyles(styles)(ActionItemParticipant);
