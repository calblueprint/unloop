import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Navbar from 'components/Navbar';
import ActionItemCreationContainer from 'components/ActionItemCreationContainer';
import styles from './styles';

class AssignmentCreationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      participants: this.props.participants,
    };
    console.log(`Is admin: ${this.props.isAdmin}`);
  }

  nextStep() {
    this.setState(prevState => ({ step: prevState.step + 1 }));
  }

  prevStep() {
    this.setState(prevState => ({ step: prevState.step - 1 }));
  }

  render() {
    return (
      <Grid container style={{ height: '100vh', width: '100vw' }}>
        <Grid item xs={1}>
          <Navbar isAdmin={this.props.isAdmin} />
        </Grid>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          justify="center"
          xs={11}
        >
          <Grid container item direction="row" justify="flex-start">
            <Grid item>
              <h1 style={{ paddingLeft: '10%', width: '100%' }}>
                {' '}
                Add Assignments to List
              </h1>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={9}
            spacing={1}
            className={this.props.classes.mainBackgroundStyle}
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <ActionItemCreationContainer templates={this.props.templates} />
            </Grid>
            <Grid item>
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
              <Button style={{ paddingRight: 100 }}>BUtton!!</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AssignmentCreationPage);
