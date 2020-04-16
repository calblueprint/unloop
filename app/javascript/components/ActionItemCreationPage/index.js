import React from 'react';
import { Grid } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'components/Navbar';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import ActionItemCreationContainer from 'components/ActionItemCreationContainer';
import ActionItemSearchParticipants from 'components/ActionItemSearchParticipants';
import ActionItemList from 'components/ActionItemList';
import ActionItemDisplayParticipants from 'components/ActionItemDisplayParticipants';
import styles from './styles';

class ActionItemCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      participants: this.props.participants,
      selectedParticipants: [],
    };

    this.addUserToState = this.addUserToState.bind(this);
    this.removeUserFromState = this.removeUserFromState.bind(this);
    this.addAllUsersToState = this.addAllUsersToState.bind(this);
    this.removeAllUsersFromState = this.removeAllUsersFromState.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
  }

  nextStep() {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  }

  prevStep() {
    this.setState(prevState => ({ step: prevState.step - 1 }));
  }

  addUserToState(user) {
    this.setState(prevState => ({
      selectedParticipants: [...prevState.selectedParticipants, user],
    }));
  }

  // Removes user from display
  removeUserFromState(user) {
    this.setState(prevState => {
      const copy = [...prevState.selectedParticipants];
      const index = this.state.selectedParticipants.indexOf(user);
      copy.splice(index, 1); // Removes one element at `index` location
      return { selectedParticipants: copy };
    });
  }

  // Adds all users at once to be displayed
  addAllUsersToState() {
    this.setState(prevState => ({
      selectedParticipants: prevState.participants,
    }));
  }

  // Removes all users at once from display
  removeAllUsersFromState() {
    this.setState({
      selectedParticipants: [],
    });
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
              xs={8}
              spacing={1}
              className={classes.mainBackgroundStyle}
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography className={classes.underlineStyle}>
                  Assignments
                </Typography>
                <hr className={classes.borderStyle}></hr>
                <Divider style={{ marginBottom: '10px' }} />
                {/* <ActionItemDisplayParticipants
                  selectedParticipants={this.state.selectedParticipants}
                /> */}
                <ActionItemList selectedActionItems={this.props.templates} />
                {/* <ActionItemCreationContainer templates={this.props.templates} /> */}
              </Grid>
              <Grid item>
                <Typography className={classes.underlineStyle}>
                  Assignments
                </Typography>
                <hr className={classes.borderStyle}></hr>
                <Divider style={{ marginBottom: '10px' }} />
                {/* <ActionItemSearchParticipants
                  participants={this.state.participants}
                  selectedParticipants={this.state.selectedParticipants}
                  statuses={this.props.statuses}
                  addUser={this.addUserToState}
                  removeUser={this.removeUserFromState}
                  addAllUsers={this.addAllUsersToState}
                  removeAllUsers={this.removeAllUsersFromState}
                /> */}
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
                    SAVE & CONTINUE
                  </Typography>
                </Fab>
              </Grid>
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
                    BACK
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

ActionItemCreationPage.propTypes = {
  classes: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  participants: PropTypes.array.isRequired,
};

export default withStyles(styles)(ActionItemCreationPage);
