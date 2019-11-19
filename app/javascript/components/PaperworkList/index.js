/**
 *
 * PaperworkList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, List } from '@material-ui/core';
import PaperworkEntry from 'components/PaperworkEntry';
import PaperworkForm from 'components/PaperworkForm';

import styles from './styles';

function PaperworkList({
  classes,
  paperworks,
  paperworkErrors,
  checkPaperworkErrors,
  onFormFieldChange,
  handleSubmitPaperwork,
}) {
  return (
    <Container className={classes.containerStyle}>
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
          <PaperworkForm
            errors={paperworkErrors}
            checkErrors={checkPaperworkErrors}
            onChange={onFormFieldChange}
            handleSubmit={handleSubmitPaperwork}
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
            date={paperwork.created_at}
          />
        ))}
        {paperworks.slice(-1).map(paperwork => (
          <PaperworkEntry
            key={paperwork.id}
            agree={paperwork.agree}
            id={paperwork.id}
            link={paperwork.link}
            title={paperwork.title}
            date={paperwork.created_at}
            lastEntry
          />
        ))}
      </List>
    </Container>
  );
}

PaperworkList.propTypes = {
  classes: PropTypes.object.isRequired,
  paperworks: PropTypes.array.isRequired,
  paperworkErrors: PropTypes.object.isRequired,
  checkPaperworkErrors: PropTypes.func.isRequired,
  onFormFieldChange: PropTypes.func.isRequired,
  handleSubmitPaperwork: PropTypes.func.isRequired,
};

export default compose(withStyles(styles), memo)(PaperworkList);
