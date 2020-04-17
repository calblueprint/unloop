import React from 'react';
import styles from './styles';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import StaffDashboard from '../StaffDashboard';
import theme from 'utils/theme';

import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UnloopLogo from 'images/unloop_logo.png';
import * as Sentry from '@sentry/browser';
import { apiGet } from '../../utils/axios';

function Main(props) {
    const classes = props.classes;

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
        <ListItem button
        component="a"
        disableFocusRipple
        disableTouchRipple
        className={classes.navBarItem}
        onClick={() => window.location.href = '/admin'}
        >
        <ExitToAppIcon fontSize="large" />
        <div className = {classes.navText} > Admin View </div>
        </ListItem>
        
    );

    const getIcon = (name) => {
        switch (name) {
            case 'Dashboard':
                return <HomeIcon />
            case 'Bulk Assign':
                return <GroupIcon />
            case 'Assessments':
                return <BarChartIcon />
        }
    }

    const getButton = (name, route) => {
        return <ListItem button 
                key={name}
                component="a"
                disableFocusRipple
                disableTouchRipple
                className={classes.navBarItem}
                onClick={() => {window.location.href = route}}>
                {getIcon(name)}
                <div className={classes.navText}>{name}</div>
        </ListItem>
    }

    
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
                <div className = {classes.navText}> Sign Out </div>
                </ListItem>
                {props.isAdmin ? renderAdminButton() : null}
                {Object.entries({'Dashboard': '/', 'Bulk Assign': '/assignments', 'Assessments': '/studio_assessments'}).map((n) => {
                    return getButton(n[0], n[1])
                })}
            </List>
            </Drawer>
        </div>
        <main className={classes.content}>
            <StaffDashboard participants={props.participants} ></StaffDashboard>
        </main>
    </ThemeProvider>
    );
}

export default withStyles(styles)(Main);
