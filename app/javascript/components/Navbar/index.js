import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Button, Grid, Drawer } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UnloopLogo from 'images/unloop_logo.png';
import styles from './styles';
import { apiGet } from '../../utils/axios';

function Navbar({ classes, isAdmin }) {
  const navigateToAdminBoard = () => {
    window.location.href = '/admin';
  };
  const navigateToHomepage = () => {
    window.location.href = '/';
  };
  const navigateToAssignments = () => {
    window.location.href = '/assignments';
  };
  const navigateToStudio = () => {
    window.location.href = '/studio_assessments';
  };


  const renderAdminButton = () => (
            <IconButton
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarItem}
              onClick ={navigateToAdminBoard}
            >
              <ExitToAppIcon  fontSize="large" />
            </IconButton>
  );

  const logout = () => {
    const path = '/users/sign_out';
    apiGet(path)
      .then(navigateToHomepage)
      .catch(error => console.error(error));
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
          <IconButton
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarItem}
              onClick={logout}
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
            Sign Out
          </Grid>
          {isAdmin ? <Grid item>{renderAdminButton()} Admin View </Grid> : null}
          <Grid item>
            <IconButton
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarItem}
              onClick={navigateToHomepage}
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            Dashboard
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
            Bulk Assign
          </Grid>
          <Grid item>
            <IconButton
              disableFocusRipple
              disableTouchRipple
              className={classes.navBarItem}
              onClick ={navigateToStudio}
            >
              <BarChartIcon fontSize="large" />
            </IconButton>
            Assessments
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
