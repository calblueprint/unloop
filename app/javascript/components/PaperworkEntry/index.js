/**
 *
 * PaperworkEntry
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardHeader,
  Grid,
} from '@material-ui/core';

import styles from './styles';

function PaperworkEntry({
  classes,
  agree,
  id,
  date,
  link,
  title,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  lastEntry = false,
}) {
  const formatDate = dateString => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const dt = dateObj.getDate();
    return `${month.toString()}/${dt.toString()}/${year.toString()}`;
  };

  const avatar = (
    <Avatar
      variant="circle"
      className={agree ? classes.darkGreyAvatar : classes.lightGreyAvatar}
    />
  );

  const dateString = formatDate(date);
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
          subheader={<i>Assigned: {dateString}</i>}
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
          <Button
            variant="contained"
            color="primary"
            href={`/paperworks/${id}`}
          >
            Edit
          </Button>
        </CardActions>
      </Grid>
    </Card>
  );
}

PaperworkEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  agree: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  link: PropTypes.string,
  title: PropTypes.string,
  lastEntry: PropTypes.bool,
};

export default compose(withStyles(styles), memo)(PaperworkEntry);
