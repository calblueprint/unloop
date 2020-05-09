import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import theme from 'utils/theme';
import styles from './styles';

function ActionItemCategoryTag({
  classes,
  category,
  // If handleClick not passed it is assumed the component is not clickable
  handleClick,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  selected,
}) {
  const notInteractable = handleClick === undefined;
  const notInteractableStyle = notInteractable
    ? { backgroundColor: theme.palette.common.lighterBlue }
    : null;
  return (
    <Fab
      className={classes.iconStyle}
      // Additional style needed to make disabled Fab correct color
      style={notInteractableStyle}
      component="span"
      variant="extended"
      size="small"
      aria-label="category"
      disabled={notInteractable}
      disableRipple={notInteractable}
      disableFocusRipple={notInteractable}
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
  category: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default withStyles(styles)(ActionItemCategoryTag);
