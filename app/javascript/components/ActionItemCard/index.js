import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import theme from 'utils/theme';
import styles from './styles';
import Box from '@material-ui/core/Box';

function ActionItemCard({
  classes,
  title,
  description,
  dueDate,
  category,
  selected,
  renderClose,
  // Used by style file
  // eslint-disable-next-line no-unused-vars
  lastEntry = false,
  handleIconClick,
  removeActionItem,
}) {
  const renderSelectIcon = () => (
    <IconButton aria-label="add" onClick={handleIconClick}>
      {selected ? <CheckCircleIcon /> : <AddIcon />}
    </IconButton>
  );

  const renderCloseIcon = () => (
    <IconButton aria-label="close" onClick={removeActionItem}>
      <CloseIcon style={{ fontSize: 'medium' }} />
    </IconButton>
  );

  const renderDeleteButton = () => (
    <Button
      size="small"
      className={classes.buttonStyle}
      onClick={removeActionItem}
    >
      DELETE
    </Button>
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={1}
        className={classes.cardStyle}
        direction="column"
        justify="space-evenly"
      >
        <Grid
          item
          container
          alignItems="center"
          justify="space-between"
          wrap="nowrap"
          spacing={2}
        >
          <Grid item container alignItems="center" wrap="nowrap">
            <Grid item className={classes.titleStyle}>
              <Typography variant="subtitle1" noWrap>
                {' '}
                {title}{' '}
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.iconStyle}>
                <Typography
                  className={classes.categoryButtonStyle}
                  color="primary"
                  align="center"
                >
                  {category ? category.toUpperCase() : category}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid item>{renderClose ? renderCloseIcon() : null}</Grid>
        </Grid>
        <Grid item container alignItems="center" spacing={6}>
          <Grid item xs={9} className={classes.descriptionStyle}>
            <Typography variant="body1" style={{ fontSize: '14px' }}>
              {description}
            </Typography>
          </Grid>
          <Grid item>{handleIconClick ? renderSelectIcon() : null}</Grid>
        </Grid>
        <Grid item container justify="space-between" alignItems="center">
          <Grid item>
            {dueDate ? (
              <Typography variant="body2">Due Date: {dueDate}</Typography>
            ) : null}
          </Grid>
          <Grid
            item
            container
            direction="row-reverse"
            xs={6}
            justify="space-evenly"
          >
            {/* Commented out because it doesn't have functionality right now */}
            <Grid item>
              <Button 
                size="small" 
                className={classes.buttonStyle}
                // onClick={editActionItem}
              >
                EDIT
              </Button>
            </Grid>
            <Grid item>{renderClose ? null : renderDeleteButton()}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

ActionItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  renderClose: PropTypes.bool.isRequired,
  dueDate: PropTypes.string,
  handleIconClick: PropTypes.func,
  removeActionItem: PropTypes.func,
  lastEntry: PropTypes.bool,
};
export default withStyles(styles)(ActionItemCard);
