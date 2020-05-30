import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Grid, Box, Typography } from '@material-ui/core';
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
    <Grid
      item
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      role="button"
      tabIndex={0}
      onKeyDown={() => changeChecked(participant)}
      onClick={() => changeChecked(participant)}
      className={classes.participant}
    >
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        zeroMinWidth
        style={{ width: '80%' }}
      >
        <Box
          className={classes.participantBar}
          style={{
            backgroundColor: theme.palette.common[participant.status],
          }}
        />
        <Typography noWrap variant="body1" style={{ fontSize: '16px' }}>
          {participant.name}
        </Typography>
      </Grid>
      <Grid item>{button}</Grid>
    </Grid>
  );
}

ActionItemParticipant.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  participant: PropTypes.object.isRequired,
  changeChecked: PropTypes.func,
};

export default withStyles(styles)(ActionItemParticipant);
