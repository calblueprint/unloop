import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Button, Grid, Drawer } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import UnloopLogo from 'images/unloop_logo.png';
import * as Sentry from '@sentry/browser';
import styles from './styles';
import { apiGet } from '../../utils/axios';

function Navbar({ classes, isAdmin }) {
  const navigateToAdminBoard = () => {
    window.location.href = '/admin';
  };

  const navigateToHomepage = () => {
    window.location.href = '/';
    Sentry.configureScope(scope => scope.setUser(null));
  };
  const navigateToAssignments = () => {
    window.location.href = '/assignments';
  };

  const renderAdminButton = () => (
    <Button
      component="a"
      disableFocusRipple
      disableTouchRipple
      className={classes.navBarItem}
      onClick={navigateToAdminBoard}
    >
      Admin Board
    </Button>
  );

  const logout = () => {
    const path = '/users/sign_out';
    apiGet(path)
      .then(navigateToHomepage)
      .catch(error => {
        Sentry.configureScope(function(scope) {
          scope.setExtra('file', 'Navbar');
          scope.setExtra('action', 'apiGet');
        });
        Sentry.captureException(error);
      });
  };

  return (
    <Drawer className={classes.drawer} variant="permanent">
      <Grid
        container
        item
        xs={1}
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
              className={classes.navBarItem}
              onClick={logout}
            >
              Sign Out
            </Button>
          </Grid>
          {isAdmin ? <Grid item>{renderAdminButton()}</Grid> : null}
          <Grid item>
            <IconButton
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarItem}
              onClick={navigateToHomepage}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarItem}
              onClick ={navigateToAssignments}
            >
              <GroupIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <img
            src={UnloopLogo}
            className={classes.unloopLogo}
            alt="Unloop Logo"
          />
        </Grid>
      </Grid>
    </Drawer>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Navbar);
