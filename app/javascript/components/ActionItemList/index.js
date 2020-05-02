import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ActionItemCard from 'components/ActionItemCard';
import PropTypes from 'prop-types';
import styles from './styles';

function ActionItemList({
  classes,
  selectedActionItems,
  removeSelectedActionItem,
}) {
  const selectedCards = selectedActionItems.map((actionItem, i) => (
    <Grid item key={actionItem.title + actionItem.description}>
      <ActionItemCard
        title={actionItem.title}
        description={actionItem.description}
        dueDate={actionItem.dueDate}
        lastEntry={i === selectedActionItems.length - 1}
        category={actionItem.category}
        renderClose
        selected
        removeActionItem={() => removeSelectedActionItem(actionItem)}
      />
    </Grid>
  ));

  return (
    <Paper elevation={3} className={classes.formStyle}>
      <Grid
        container
        direction="column"
        wrap="nowrap"
        className={classes.listStyle}
        spacing={1}
      >
        {selectedCards}
      </Grid>
    </Paper>
  );
}

ActionItemList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedActionItems: PropTypes.array.isRequired,
  removeSelectedActionItem: PropTypes.func,
};

export default withStyles(styles)(ActionItemList);
