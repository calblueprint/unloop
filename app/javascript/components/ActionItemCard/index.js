import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={1}
        className={classes.cardStyle}
        direction="column"
        justify="space-evenly"
      >
        <Grid item container alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="subtitle1"> {title} </Typography>
          </Grid>
          <Grid item>
            <Box className={classes.iconStyle}>
            {/* <Fab
              className={classes.iconStyle}
              component="span"
              variant="extended"
              size="small"
              aria-label="category"
              disableRipple={true}
              disabled={true}
            > */}
              <Typography
                className={classes.categoryButtonStyle}
                color="primary"
                // align="center"
              >
                {category ? category.toUpperCase() : category}
              </Typography>
            {/* </Fab> */}
            </Box>
          </Grid>
        </Grid>
        <Grid item container alignItems="flex-start" spacing={6}>
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
            <Grid item>
              <Button
                size="small"
                className={classes.buttonStyle}
                onClick={removeActionItem}
              >
                DELETE
              </Button>
            </Grid>
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
  dueDate: PropTypes.string,
  handleIconClick: PropTypes.func,
  removeActionItem: PropTypes.func,
  lastEntry: PropTypes.bool,
};
export default withStyles(styles)(ActionItemCard);
