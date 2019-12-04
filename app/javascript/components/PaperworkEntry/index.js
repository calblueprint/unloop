/**
 *
 * PaperworkEntry
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardHeader, Grid } from '@material-ui/core';
import PaperworkForm from 'components/PaperworkForm';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import DoneIcon from '@material-ui/icons/Done';
import styles from './styles';

function PaperworkEntry({
  classes,
  agree,
  date,
  link,
  title,
  id,
  participantId,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  lastEntry = false,
}) {
  const avatar = agree ? <DoneIcon /> : <NotificationsNoneIcon />;

  return (
    <Card className={classes.card}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={6}>
          <CardHeader
            avatar={avatar}
            title={title}
            subheader={<i>Assigned: {date}</i>}
            titleTypographyProps={{ variant: 'h6' }}
          />
        </Grid>
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
            paperworkId={id}
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
  id: PropTypes.number,
};

export default memo(withStyles(styles)(PaperworkEntry));
