import React from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import theme from 'utils/theme';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UnloopLogo from 'images/unloop_logo.png';
import BlueprintBanner from 'images/blueprint_banner.png';
import * as Sentry from '@sentry/browser';
import StaffDashboard from '../StaffDashboard';
import styles from './styles';
import { apiGet } from '../../utils/axios';
import StudioAssessmentDashboard from '../StudioAssessmentDashboard';
import ParticipantShowPage from '../ParticipantShowPage';
import ActionItemCreationPage from '../ActionItemCreationPage';

function Main(props) {
  const { classes } = props;

  const navigateToHomepage = () => {
    window.location.href = '/';
    Sentry.configureScope(scope => scope.setUser(null));
  };

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

  const renderAdminButton = () => (
    <ListItem
      button
      component="a"
      disableFocusRipple
      disableTouchRipple
      className={classes.navBarItem}
      onClick={() => (window.location.href = '/admin')}
    >
      <ExitToAppIcon />
      <div className={classes.navText}> Admin View </div>
    </ListItem>
  );

  const getIcon = name => {
    switch (name) {
      case 'Dashboard':
        return <HomeIcon />;
      case 'Bulk Assign':
        return <GroupIcon />;
      case 'Assessments':
        return <BarChartIcon />;
      default:
    }
  };

  const getButton = (name, route) => (
    <ListItem
      button
      key={name}
      component="a"
      disableTouchRipple
      className={classes.navBarItem}
      onClick={() => {
        window.location.href = route;
      }}
    >
      {getIcon(name)}
      <div className={classes.navText}>{name}</div>
    </ListItem>
  );

  const getContent = () => {
    const contentProps = Object.keys(props)
      .filter(key => key !== 'classes')
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: props[key],
        }),
        {},
      );

    switch (props.content) {
      case 'StaffDashboard':
        return <StaffDashboard {...contentProps}></StaffDashboard>;
      case 'ParticipantShowPage':
        return <ParticipantShowPage {...contentProps}></ParticipantShowPage>;
      case 'StudioAssessmentDashboard':
        return (
          <StudioAssessmentDashboard
            {...contentProps}
          ></StudioAssessmentDashboard>
        );
      case 'ActionItemCreationPage':
        return (
          <ActionItemCreationPage {...contentProps}></ActionItemCreationPage>
        );
      default:
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: '100%' }}
          >
            <Grid item>
              <List className={classes.navBar}>
                <ListItem
                  button
                  component="a"
                  disableFocusRipple
                  disableTouchRipple
                  className={classes.navBarItem}
                  onClick={logout}
                >
                  <AccountCircleIcon />
                  <div className={classes.navText}> Sign Out </div>
                </ListItem>
                {props.isAdmin ? renderAdminButton() : null}
                {props.userType !== 'participant'
                  ? Object.entries({
                    Dashboard: '/',
                    'Bulk Assign': '/assignments',
                      Assessments: '/studio_assessments',
                    }).map(n => getButton(n[0], n[1]))
                  : null}
              </List>
            </Grid>
            <Grid
              container
              item
              alignItems="center"
              justify="center"
              direction="column"
              spacing={3}
              style={{ padding: '5px' }}
            >
              <Grid item>
                <img
                  src={UnloopLogo}
                  alt="Unloop logo"
                  className={classes.unloopLogo}
                />
              </Grid>
              <Grid item>
                <img
                  src={BlueprintBanner}
                  alt="Blueprint logo"
                  className={classes.blueprintLogo}
                />
              </Grid>
            </Grid>
          </Grid>
        </Drawer>
      </div>
      <main className={classes.content}>{getContent()}</main>
    </ThemeProvider>
  );
}

export default withStyles(styles)(Main);
