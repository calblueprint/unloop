import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ActionItemCard from 'components/ActionItemCard';
import PropTypes from 'prop-types';
import styles from './styles';

function ActionItemList({ classes, selectedActionItems }) {
  const selectedCards = selectedActionItems.map((template, i) => (
    <Grid item>
      <ActionItemCard
        key={template.id}
        title={template.title}
        description={template.description}
        lastEntry={i === selectedActionItems.length - 1}
        category={template.category}
      />
    </Grid>
  ));

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      className={classes.listStyle}
      spacing={1}
    >
      {selectedCards}
    </Grid>
  );
}

ActionItemList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedActionItems: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionItemList);
