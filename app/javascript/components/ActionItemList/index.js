import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ActionItemCard from 'components/ActionItemCard';
import PropTypes from 'prop-types';
import styles from './styles';

function ActionItemList({
  classes,
  selectedActionItems,
  removeSelectedActionItem,
  handleOpenModal,
}) {
  const selectedCards = selectedActionItems.map(actionItem => (
    <ActionItemCard
      key={actionItem.title + actionItem.description}
      title={actionItem.title}
      description={actionItem.description}
      dueDate={actionItem.dueDate}
      category={actionItem.category}
      handleOpenModal={handleOpenModal(actionItem)}
      renderClose
      selected
      removeActionItem={() => removeSelectedActionItem(actionItem)}
    />
  ));

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      className={classes.formStyle}
      spacing={1}
    >
      {selectedCards}
    </Grid>
  );
}

ActionItemList.propTypes = {
  classes: PropTypes.object.isRequired,
  selectedActionItems: PropTypes.array.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  removeSelectedActionItem: PropTypes.func,
};

export default withStyles(styles)(ActionItemList);
