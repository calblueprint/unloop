import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Button, Grid } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import UnloopLogo from 'images/unloop_logo.png';
import axios from 'axios';
import styles from './styles';

class Navbar extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    //   TODO: Sign out is not working
    const path = '/user/sign_out';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X_CSRF-Token': document.getElementsByName('csrf-token')[0].content,
      },
      withCredentials: true,
    };
    axios.delete(path, { ...config });
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        item
        xs={1}
        style={{ height: '100%vh' }}
        className={classes.navBar}
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid container item alignItems="center" direction="column">
          <Grid item>
            <Button
              component="a"
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarSignOut}
            >
              Sign Out
            </Button>
          </Grid>
          <Grid item>
            <IconButton
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarItem}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item className={classes.unloopLogo}>
          <img src={UnloopLogo} alt="Unloop Logo" />
        </Grid>
      </Grid>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
