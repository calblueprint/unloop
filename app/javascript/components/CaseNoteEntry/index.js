/**
 *
 * CaseNoteEntry
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';

import styles from './styles';

function CaseNoteEntry({ classes, id, title, date, description }) {
  const viewMore = () => {
    window.location = `/case_notes/${id}`;
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={viewMore}>
        <CardHeader
          title={title}
          subheader={<i>{date}</i>}
          classes={{ content: classes.headerBorder }}
        />
        <CardContent>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.justifyActions}>
        <Button color="primary">
          <b>Edit</b>
        </Button>
        <Button color="primary" onClick={viewMore}>
          <b>View More</b>
        </Button>
      </CardActions>
    </Card>
  );
}

CaseNoteEntry.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default compose(withStyles(styles), memo)(CaseNoteEntry);
