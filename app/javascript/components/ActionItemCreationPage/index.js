import React from 'react';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'components/Navbar';
import Divider from '@material-ui/core/Divider';
import ActionItemCreationContainer from 'components/ActionItemCreationContainer';
import styles from './styles';



class AssignmentCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      participants: this.props.participants,
    };
  }

  nextStep() {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  }

  prevStep() {
    this.setState(prevState => ({ step: prevState.step - 1 }));
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container style={{ height: '100vh', width: '100vw' }}>
        <Grid item xs={1}>
          <Navbar isAdmin={this.props.isAdmin} />
        </Grid>
        <Grid item container xs={11} justify="center">
            <Grid
            container
            item
            direction="column"
            alignItems="center"
            justify="center"
            xs={11}
            spacing={2}
            >
            <Grid container item direction="row" justify="flex-start">
                <Grid item>
                    <Typography className={classes.topLeftTextStyle}>
                        Add Assignments to List
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                item
                xs={9}
                spacing={1}
                className={classes.mainBackgroundStyle}
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item>
                    <Typography className={classes.underlineStyle}>
                        Assignments 
                    </Typography>
                    <hr className={classes.borderStyle}></hr>
                    <Divider style={{marginBottom: '10px'}}/>
                    <ActionItemCreationContainer templates={this.props.templates} />
                </Grid>
                <Grid item>
                    <Typography className={classes.underlineStyle}>
                        Assignments
                    </Typography>
                    <hr className={classes.borderStyle}></hr>
                    <Divider style={{marginBottom: '10px'}}/>
                    <ActionItemCreationContainer templates={this.props.templates} />
                </Grid>
            </Grid>
            <Grid
                container
                item
                direction="row-reverse"
                alignItems="center"
                spacing={3}
            >
                <Grid item>
                    <Fab
                    className={classes.iconStyle}
                    component="span"
                    variant="extended"
                    size="medium"
                    aria-label="category"
                    >
                    <Typography
                        className={classes.categoryButtonStyle}
                        align="center"
                    >
                        {"Save and Continue"}
                    </Typography>
                    </Fab>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AssignmentCreationPage);
