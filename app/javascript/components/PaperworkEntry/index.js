/**
 *
 * PaperworkEntry
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
} from '@material-ui/core';
import PaperworkForm from 'components/PaperworkForm';

import styles from './styles';

function PaperworkEntry({
  classes,
  agree,
  date,
  link,
  title,
  participantId,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  lastEntry = false,
}) {
  const avatar = (
    <Avatar
      variant="circle"
      className={agree ? classes.darkGreyAvatar : classes.lightGreyAvatar}
    />
  );

  return (
    <Card className={classes.card}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <CardHeader
          avatar={avatar}
          title={title}
          subheader={<i>Assigned: {date}</i>}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            href={link}
            target="_blank"
          >
            View
          </Button>
          <PaperworkForm
            type="edit"
            participantId={participantId}
            paperworkTitle={title}
            paperworkLink={link}
          />
        </CardActions>
      </Grid>
    </Card>
  );
}

PaperworkEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  agree: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string,
  participantId: PropTypes.number.isRequired,
  lastEntry: PropTypes.bool,
};

export default memo(withStyles(styles)(PaperworkEntry));
