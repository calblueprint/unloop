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

        <Card className={classes.cardStyle}>
        <Grid container spacing={1} direction={"column"} style={{ margin: '5px' }}>
            <Grid item container alignItems="center" spacing={3}>
                <Grid item>
                    <Typography variant="subtitle1"> {title} </Typography>
                </Grid>
                <Grid item className={classes.categoryStyle}>
                    <Fab
                    style={{backgroundColor: '#DCF0F2'}}
                    component="span"
                    variant="extended"
                    size="small"
                    disabled
                    disableRipple
                    disableFocusRipple
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
            <Grid item container justify="space-between" alignItems="center">
            <Grid item xs={9}>
                <Typography variant="body1">{description}</Typography>
            </Grid>
            <Grid item>
                <AddIcon style={{ paddingRight: '30px' }} />
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
        </Card>
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
