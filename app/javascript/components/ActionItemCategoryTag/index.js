import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import styles from './styles';

function ActionItemCategoryTag({
  classes,
  category,
  handleClick,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  selected,
}) {
  return (
    <Fab
      className={classes.iconStyle}
      component="span"
      variant="extended"
      size="small"
      aria-label="category"
      onClick={() => handleClick(category)}
    >
      <Typography className={classes.categoryButtonStyle} align="center">
        {category.toUpperCase()}
      </Typography>
    </Fab>
  );
}

ActionItemCategoryTag.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.oneOf([
    'Finances',
    'Project',
    'Community',
    'Startup',
    'Treatment',
    'Health',
    'Education',
  ]).isRequired,
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
};

export default withStyles(styles)(ActionItemCategoryTag);
