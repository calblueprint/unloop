import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import styles from './styles';
import theme from 'utils/theme';

function ActionItemCard({
  classes,
  title,
  description,
  dueDate,
  category,
  transferCallback,
}) {
  return (
    <ThemeProvider theme={theme}>
        <Grid container spacing={1} className={classes.cardStyle} direction={"column"} style={{ margin: '10px 15px' }}>
            <Grid item container alignItems="center" spacing={3}>
                <Grid item>
                    <Typography variant="subtitle1"> {title} </Typography>
                </Grid>
                <Grid item>
                    <Fab
                    className={classes.iconStyle}
                    component="span"
                    variant="extended"
                    size="small"
                    aria-label="category"
                    >
                    <Typography
                        className={classes.categoryButtonStyle}
                        color={"primary"}
                        align="center"
                    >
                        {category.toUpperCase()}
                    </Typography>
                    </Fab>
                </Grid>
            </Grid>
            <Grid item container alignItems="flex-start" spacing={6}>
            <Grid item xs={9}>
                <Typography variant="body1">{description}</Typography>
            </Grid>
            <Grid item>
                <AddIcon />
            </Grid>
            </Grid>
            <Grid item container justify="space-between" alignItems="center">
            <Grid item>
                {dueDate ? <Typography variant="body2">Due date: 04/21/2020</Typography> : null}
            </Grid>
            <Grid
                item
                container
                direction="row-reverse"
                xs={6}
                justify="space-evenly"
            >
                <Grid item>
                <Button size="small">Small</Button>
                </Grid>
                <Grid item>
                <Button size="small">Small2</Button>
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
    dueDate: PropTypes.string,
    transferCallback: PropTypes.func
  };
export default withStyles(styles)(ActionItemCard);
